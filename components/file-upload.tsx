'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

import '@uploadthing/react/styles.css'

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'serverImage' | 'messageFile';
}

export const FileUpload = ({onChange, value, endpoint}: FileUploadProps) => {
    const fileType = value?.split('.').pop();
    if(value && fileType !== 'pdf') {
        return(
            <div className="relative h-20 w-20">
                <Image
                fill
                src={value}
                alt="Upload Preview"
                className="rounded-full"
                />
                <button onClick={() => onChange('')} className="file-upload_cancel-btn" type="button">
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }
    return (
       <UploadDropzone
       endpoint={endpoint}
       onClientUploadComplete={(res) => onChange(res?.[0].url)}
       onUploadError={(err: Error) => console.error(err)}
       />
    )
}