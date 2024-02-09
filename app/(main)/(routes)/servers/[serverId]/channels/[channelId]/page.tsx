import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { MediaRoom } from '@/components/media-room';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const { serverId, channelId } = params;
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect(`/`);

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader serverId={serverId} name={channel.name} type='channel' />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            chatId={channelId}
            name={channel.name}
            type='channel'
            apiUrl='/api/messages'
            socketUrl='/api/socket/messages'
            socketQuery={{
              serverId,
              channelId,
            }}
            paramKey='channelId'
            paramValue={channelId}
          />
          <ChatInput
            name={channel.name}
            type='channel'
            apiUrl={'/api/socket/messages'}
            query={{
              serverId,
              channelId,
            }}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} audio={true} video={false} />
      )}

      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} audio={true} video={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;
