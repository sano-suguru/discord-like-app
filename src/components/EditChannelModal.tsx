import React, { useCallback, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay
} from '@chakra-ui/react';
import { useChannelStore } from '../stores/channelStore';

interface EditChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
    channelId: string | null;
    currentName: string;
}

interface EditChannelForm {
    name: string;
}

export const EditChannelModal: React.FC<EditChannelModalProps> = React.memo(({ isOpen, onClose, channelId, currentName }) => {
    const updateChannel = useChannelStore(state => state.updateChannel);
    const { register, handleSubmit, reset } = useForm<EditChannelForm>();

    useEffect(() => {
        if (isOpen) {
            reset({ name: currentName });
        }
    }, [isOpen, currentName, reset]);

    const onSubmit = useCallback((data: EditChannelForm) => {
        if (channelId) {
            updateChannel(channelId, { name: data.name });
            onClose();
        }
    }, [channelId, updateChannel, onClose]);

    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [reset, onClose]);

    const modalContent = useMemo(() => (
        <ModalContent>
            <ModalHeader>Edit Channel</ModalHeader>
            <ModalCloseButton onClick={handleClose} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Channel Name</FormLabel>
                        <Input {...register('name', { required: true })} placeholder={currentName} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                        Save
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </form>
        </ModalContent>
    ), [handleSubmit, onSubmit, register, handleClose, currentName]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            {modalContent}
        </Modal>
    );
});

EditChannelModal.displayName = 'EditChannelModal';
