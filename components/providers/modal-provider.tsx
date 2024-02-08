'use client';

import { CreateServerModal } from '@/components/modals/CreateServerModal';
import { useEffect, useState } from 'react';
import { InviteModal } from '@/components/modals/InviteModal';
import { EditServerModal } from '@/components/modals/EditServerModal';
import { MembersModal } from '@/components/modals/MembersModal';
import { CreateChannelModal } from '@/components/modals/CreateChannelModal';
import { DeleteServerModal } from '@/components/modals/DeleteServerModal';
import { LeaveServerModal } from '@/components/modals/LeaveServerModal';
import { EditChannelModal } from '@/components/modals/EditChannelModal';
import { DeleteChannelModal } from '@/components/modals/DeleteChannelModal';
import { MessageFilModel } from '@/components/modals/MessageFileModal';
import { DeleteMessageModal } from '@/components/modals/DeleteMessageModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <MessageFilModel />
      <DeleteMessageModal />
    </>
  );
};
