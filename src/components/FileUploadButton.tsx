import React, { useCallback, useRef } from 'react';

import { AttachmentIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react';

interface FileUploadButtonProps {
    onFileSelect: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, [fileInputRef]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    return (
        <>
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <Button onClick={handleClick} leftIcon={<AttachmentIcon />} size="sm">
            </Button>
        </>
    );
};

export default FileUploadButton;