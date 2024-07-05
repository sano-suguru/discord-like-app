import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useChannelStore } from '../stores/channelStore';

interface EditChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
    channelId: string | null;
}

interface EditChannelForm {
    name: string;
}

const EditChannelModal: React.FC<EditChannelModalProps> = ({ isOpen, onClose, channelId }) => {
    const { channels, updateChannel } = useChannelStore();
    const channel = channels.find((c) => c.id === channelId);
    const { register, handleSubmit, reset } = useForm<EditChannelForm>({
        defaultValues: { name: channel?.name || '' },
    });

    const onSubmit = (data: EditChannelForm) => {
        if (channelId) {
            updateChannel(channelId, { name: data.name });
            onClose();
            reset();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Channel</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Channel Name</FormLabel>
                            <Input {...register('name', { required: true })} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EditChannelModal;