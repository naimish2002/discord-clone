import { currentProfilePages } from '@/lib/current-profile-pages';
import { db } from '@/lib/db';
import { NextApiResponseServerIo } from '@/types';
import { NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseServerIo
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const profile = await currentProfilePages(request);
    const { content, fileUrl } = request.body;
    const { serverId, channelId } = request.query;

    if (!profile) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    if (!serverId) {
      return response.status(400).json({ error: 'Server ID is required' });
    }

    if (!channelId) {
      return response.status(400).json({ error: 'Channel ID is required' });
    }

    if (!content) {
      return response.status(400).json({ error: 'Content is required' });
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

    const Channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!Channel) {
      return response.status(404).json({ error: 'Channel not found' });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return response.status(403).json({ error: 'Forbidden' });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    response?.socket?.server?.io?.emit(channelKey, message);

    return response.status(200).json(message);
  } catch (error) {
    console.error('MESSAGES_POST: ', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
