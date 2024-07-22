import React, { useCallback, useRef } from 'react';

import { AttachmentIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react';

interface FileUploadButtonProps {
    onFileSelect: (file: File) => void;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = React.memo(({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
        event.target.value = '';
    }, [onFileSelect]);

    return (
        <>
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z"
            />
            <Button onClick={handleClick} leftIcon={<AttachmentIcon />} size="sm" aria-label="Upload file" />
        </>
    );
});

FileUploadButton.displayName = 'FileUploadButton';
