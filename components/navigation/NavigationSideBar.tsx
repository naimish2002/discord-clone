import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import NavigationAction from './NavigationAction';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationItem } from './NavigationItem';
import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';

const NavigationSideBar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect('/');

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className='space-y-4 flex flex-col items-center h-full w-full text-primary bg-[#E3E5E8] dark:bg-[#1E1F22] py-3'>
      <NavigationAction />
      <Separator className='nevigation-sidebar_separator' />
      <ScrollArea className='flex-1 w-full'>
        {servers.map((server) => (
          <div key={server.id} className='mb-4'>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className='pb-3 mt-auto flex flex-col items-center gap-y-4'>
        <ModeToggle />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSideBar;
