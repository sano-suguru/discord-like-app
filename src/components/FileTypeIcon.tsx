import React from 'react';
import { FaFile, FaFileAudio, FaFileImage, FaFilePdf, FaFileVideo } from 'react-icons/fa';

import { Icon } from '@chakra-ui/react';

interface FileTypeIconProps {
    type: string;
}

export const FileTypeIcon: React.FC<FileTypeIconProps> = ({ type }) => {
    if (type.startsWith('image/')) return <Icon as={FaFileImage} />;
    if (type === 'application/pdf') return <Icon as={FaFilePdf} />;
    if (type.startsWith('video/')) return <Icon as={FaFileVideo} />;
    if (type.startsWith('audio/')) return <Icon as={FaFileAudio} />;
    return <Icon as={FaFile} />;
};
