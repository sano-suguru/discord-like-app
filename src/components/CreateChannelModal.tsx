import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Switch, Textarea
} from '@chakra-ui/react';

import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';
import { useChannelStore } from '../stores/channelStore';
import { useUserStore } from '../stores/userStore';

interface CreateChannelForm {
    name: string;
    description: string;
    isPrivate: boolean;
}

interface CreateChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = React.memo(({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm<CreateChannelForm>();
    const createChannel = useChannelStore(state => state.createChannel);
    const user = useUserStore(state => state.user);

    const [memorizedUser] = useDeepCompareMemoize([user]);

    const onSubmit = useCallback((data: CreateChannelForm) => {
        if (memorizedUser) {
            createChannel(data.name, data.description, data.isPrivate, memorizedUser.id);
            reset();
            onClose();
        }
    }, [createChannel, memorizedUser, reset, onClose]);

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    // onCloseとresetを組み合わせた新しい関数
    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [reset, onClose]);

    const modalContent = useMemo(() => (
        <ModalContent>
            <ModalHeader>新規チャンネル作成</ModalHeader>
            <ModalCloseButton onClick={handleClose} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Channel Name</FormLabel>
                        <Input {...register('name', { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...register('description')} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Private Channel</FormLabel>
                        <Switch {...register('isPrivate')} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                        Create
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </form>
        </ModalContent>
    ), [handleSubmit, onSubmit, register, handleClose]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            {modalContent}
        </Modal>
    );
});

CreateChannelModal.displayName = 'CreateChannelModal';
