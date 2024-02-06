'use client';

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModalStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/userOrigin';
import { useState } from 'react';
import axios from 'axios';

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onGenerateLink = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen('invite', { server: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white dark:bg-[#313338] text-black dark:text-[#f2f3f5] p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-[#dbdee1]'>
            Server invite Link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              disabled={isLoading}
              className='bg-zinc-300/50 dark:bg-[#1e1f22] border-0 focus-visible:ring-0 text-black dark:text-[#f2f3f5] focus-visible:ring-offset-0'
              value={inviteUrl}
            />
            <Button
              size='icon'
              onClick={onCopy}
              disabled={isLoading}
              className='bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700'>
              {copied ? (
                <Check className='w-4 h-4 text-green-600' />
              ) : (
                <Copy className='w-4 h-4 text-indigo-600' />
              )}
            </Button>
          </div>
          <Button
            variant='link'
            size='sm'
            className='text-xs text-zinc-500 dark:text-[#dbdee1] mt-4'
            disabled={isLoading}
            onClick={onGenerateLink}>
            Generate a new link
            <RefreshCw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
