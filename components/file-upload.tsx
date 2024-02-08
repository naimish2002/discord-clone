'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

import '@uploadthing/react/styles.css';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'serverImage' | 'messageFile';
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop();
  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image
          fill
          src={value}
          alt='Upload Preview'
          className='rounded-full object-cover'
        />
        <button
          onClick={() => onChange('')}
          className='file-upload_cancel-btn top-0 right-0'
          type='button'>
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
        <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-200' />
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'>
          {value}
        </a>
        <button
          onClick={() => onChange('')}
          className='file-upload_cancel-btn -top-2.5 -right-2.5'
          type='button'>
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(err: Error) => console.error(err)}
    />
  );
};
