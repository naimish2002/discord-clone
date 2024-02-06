'use client';

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModalStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteServer';
  const { server } = data;

  const onLeaveServer = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white dark:bg-[#313338] text-black dark:text-[#f2f3f5] p-0 overflow-hidden'>
        <DialogHeader className='pt-3 px-6 pb-5'>
          <DialogTitle className='text-2xl font-bold text-start'>
            Delete &apos;{server?.name}&apos;
          </DialogTitle>
          <DialogDescription className='dark:text-[#dbdee1] text-justify'>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-rose-600 dark:text-rose-500'>
              {server?.name}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 dark:bg-[#2b2d31] px-6 py-4'>
          <div className='flex items-center gap-x-4'>
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant='ghost'
              className='leave-server_cancel-btn'>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className='bg-red-600 hover:bg-red-700 dark:text-[#f2f3f5]'
              onClick={onLeaveServer}>
              Delete Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
