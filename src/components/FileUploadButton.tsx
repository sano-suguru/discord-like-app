import React, { useRef } from 'react';

import { AttachmentIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react';

interface FileUploadButtonProps {
    onFileSelect: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

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