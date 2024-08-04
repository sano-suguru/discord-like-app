import React from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Image, Text } from '@chakra-ui/react';

import { FileAttachment } from '../types/fileAttachment';

interface AttachmentPreviewProps {
    attachment: FileAttachment;
    onRemove: () => void;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachment, onRemove }) => {
    const isImage = attachment.type.startsWith('image/');

    return (
        <Box>
            <HStack>
                <Text fontSize="sm">
                    Attached: {attachment.name}
                </Text>
                <IconButton
                    aria-label="Remove attachment"
                    icon={<DeleteIcon />}
                    size="xs"
                    onClick={onRemove}
                />
            </HStack>
            {isImage && (
                <Box mt={2} maxWidth="100px" maxHeight="100px" overflow="hidden">
                    <Image
                        src={attachment.url}
                        alt={attachment.name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                    />
                </Box>
            )}
        </Box>
    );
};
