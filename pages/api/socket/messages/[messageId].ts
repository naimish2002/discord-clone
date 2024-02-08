import { currentProfilePages } from '@/lib/current-profile-pages';
import { db } from '@/lib/db';
import { NextApiResponseServerIo } from '@/types';
import { MemberRole } from '@prisma/client';
import { NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseServerIo
) {
  if (request.method !== 'DELETE' && request.method !== 'PATCH') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const profile = await currentProfilePages(request);
    const { messageId, serverId, channelId } = request.query;
    const { content } = request.body;

    if (!profile) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    if (!serverId) {
      return response.status(400).json({ error: 'Server ID is required' });
    }

    if (!channelId) {
      return response.status(400).json({ error: 'Channel ID is required' });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return response.status(404).json({ error: 'Server not found' });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return response.status(404).json({ error: 'Channel not found' });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return response.status(404).json({ error: 'Member not found' });
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      return response.status(404).json({ error: 'Message not found' });
    }

    const isMessageOwner = message.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModifyMessage = isAdmin || isModerator || isMessageOwner;

    if (!canModifyMessage) {
      return response.status(403).json({ error: 'Forbidden' });
    }

    if (request.method === 'DELETE') {
      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          fileUrl: null,
          content: 'This message has been deleted',
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (request.method === 'PATCH') {
      if (!isMessageOwner) {
        return response.status(403).json({ error: 'Unauthorized' });
      }
      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;

    response?.socket?.server?.io?.emit(updateKey, message);

    return response.status(200).json(message);
  } catch (error) {
    console.error('MESSAGE_ID', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
