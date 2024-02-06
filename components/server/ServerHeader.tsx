'use client';

import { ServerWithMembersWithProfile } from '@/types';
import { MemberRole } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';
import { useModal } from '@/hooks/useModalStore';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button className='server-header_btn'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='server_header-dropdown-content'>
        {isModerator && (
          <>
            <DropdownMenuItem
              className='server_header-dropdown-item text-indigo-600 dark:text-indigo-400'
              onClick={() => onOpen('invite', { server })}>
              Invite People
              <UserPlus className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
            <DropdownMenuItem className='server_header-dropdown-item'>
              Create Channel
              <PlusCircle className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem className='server_header-dropdown-item'>
              Server Settings
              <Settings className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
            <DropdownMenuItem className='server_header-dropdown-item'>
              Manage Members
              <Users className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className='server_header-dropdown-item text-rose-600 dark:text-rose-500'>
            Delete Server
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className='server_header-dropdown-item text-rose-600 dark:text-rose-500'>
            Leave Server
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
