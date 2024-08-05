import React, { useState } from 'react';

import { Image, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';

interface ImagePreviewProps {
    src: string;
    alt: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Image
                src={src}
                alt={alt}
                objectFit="cover"
                width="100%"
                height="100%"
                cursor="pointer"
                onClick={() => setIsOpen(true)}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <Image src={src} alt={alt} />
                </ModalContent>
            </Modal>
        </>
    );
};
