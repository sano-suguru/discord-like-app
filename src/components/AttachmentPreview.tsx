import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FileAttachment, UploadStatus } from '../types/fileAttachment';
import { ImagePreview } from './ImagePreview';
import { FileTypeIcon } from './FileTypeIcon';
import { UploadProgress } from './UploadProgress';

interface AttachmentPreviewProps {
    attachment: FileAttachment | {
        name: string;
        type: string;
        size: number;
        url: string;
    };
    onRemove: () => void;
    uploadStatus: UploadStatus;
    uploadProgress: number;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
    attachment,
    onRemove,
    uploadStatus,
    uploadProgress
}) => {
    const isImage = attachment.type.startsWith('image/');
    const fileSize = attachment.size ? `${(attachment.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size';

    return (
        <Box borderWidth={1} borderRadius="md" p={2}>
            <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                    <HStack>
                        <FileTypeIcon type={attachment.type} />
                        <Text fontSize="sm" fontWeight="bold">
                            {attachment.name}
                        </Text>
                    </HStack>
                    <IconButton
                        aria-label="Remove attachment"
                        icon={<DeleteIcon />}
                        size="xs"
                        onClick={onRemove}
                        isDisabled={uploadStatus === 'uploading'}
                    />
                </HStack>
                <Text fontSize="xs" color="gray.500">
                    {fileSize} - {attachment.type}
                </Text>
                {uploadStatus === 'uploading' && (
                    <UploadProgress progress={uploadProgress} />
                )}
                {uploadStatus === 'error' && (
                    <Text color="red.500" fontSize="sm">Upload failed. Please try again.</Text>
                )}
                {isImage && attachment.url && uploadStatus === 'complete' && (
                    <Box maxWidth="200px" maxHeight="200px" overflow="hidden">
                        <ImagePreview src={attachment.url} alt={attachment.name} />
                    </Box>
                )}
            </VStack>
        </Box>
    );
};
