import { Menu, MenuIcon } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavigationSideBar from '@/components/navigation/NavigationSideBar';
import { ServerSidebar } from '@/components/server/ServerSidebar';

export const MobileToggle = ({serverId}: {serverId: string}) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button className='md:hidden' variant='ghost' size='icon'>
                <MenuIcon />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className='p-0 flex gap-0'>
            <div className='w-[72px]'>
                <NavigationSideBar />
            </div>
            <ServerSidebar serverId={serverId} />
        </SheetContent>
    </Sheet>
  );
};
