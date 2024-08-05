import React from 'react';

import { Progress, Text } from '@chakra-ui/react';

interface UploadProgressProps {
    progress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
    return (
        <>
            <Progress value={progress} size="sm" colorScheme="blue" />
            <Text fontSize="xs" mt={1}>
                Uploading: {progress.toFixed(0)}%
            </Text>
        </>
    );
};
