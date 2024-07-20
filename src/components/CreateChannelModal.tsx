import React from 'react';
import { useForm } from 'react-hook-form';

import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Switch, Textarea
} from '@chakra-ui/react';

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

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm<CreateChannelForm>();
    const createChannel = useChannelStore(state => state.createChannel);
    const { user } = useUserStore();

    const onSubmit = (data: CreateChannelForm) => {
        if (user) {
            createChannel(data.name, data.description, data.isPrivate, user.id);
            reset();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Channel</ModalHeader>
                <ModalCloseButton />
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
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};