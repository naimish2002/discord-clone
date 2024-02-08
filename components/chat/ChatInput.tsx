'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import qs from 'query-string';
import axios from 'axios';
import { useModal } from '@/hooks/useModalStore';
import { EmojiPicker } from '@/components/EmojiPicker';
import { useRouter } from 'next/navigation';

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'channel' | 'conversation';
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query: query,
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative p-4 pb-6'>
                  <div className='absolute top-7 left-8'>
                    <EmojiPicker
                    onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                    />
                  </div>

                  <Input
                    disabled={isLoading}
                    className='chat-input_input'
                    placeholder={`Message ${
                      type === 'conversation' ? name : `#${name}`
                    }`}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => onOpen('messageFile', { apiUrl, query })}
                    className='chat-input_add-btn'>
                    <Plus className='text-white dark:text-[#313338]' />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
