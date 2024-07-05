import React, { useState } from 'react';
import { Box, VStack, Text, IconButton, Flex, Input } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useChannelStore } from '../stores/channelStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface ChannelListProps {
    editingChannelId: string | null;
    onEditChannel: (channelId: string) => void;
    onFinishEdit: () => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({ editingChannelId, onEditChannel, onFinishEdit }) => {
    const { channels, currentChannel, setCurrentChannel, deleteChannel, updateChannel } = useChannelStore();
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();
    const [newChannelName, setNewChannelName] = useState<string>('');

    const handleChannelClick = (channelId: string) => {
        setCurrentChannel(channelId);
        navigate(`/chat/${channelId}`);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewChannelName(event.target.value);
    };

    const handleNameSubmit = (channelId: string) => {
        if (newChannelName.trim()) {
            updateChannel(channelId, { name: newChannelName });
        }
        onFinishEdit();
    };

    return (
        <VStack align="stretch" spacing={2}>
            {channels.map(channel => (
                <Flex
                    key={channel.id}
                    p={2}
                    bg={currentChannel?.id === channel.id ? 'gray.200' : 'transparent'}
                    alignItems="center"
                    justifyContent="space-between"
                    cursor="pointer"
                    onClick={() => handleChannelClick(channel.id)}
                    _hover={{ bg: 'gray.100' }}
                >
                    {editingChannelId === channel.id ? (
                        <Box display="flex" alignItems="center">
                            <Input
                                value={newChannelName}
                                onChange={handleNameChange}
                                placeholder="New Channel Name"
                                size="sm"
                                mr={2}
                            />
                            <IconButton
                                aria-label="Save channel"
                                icon={<CheckIcon />}
                                size="sm"
                                mr={1}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNameSubmit(channel.id);
                                }}
                            />
                            <IconButton
                                aria-label="Cancel edit"
                                icon={<CloseIcon />}
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFinishEdit();
                                }}
                            />
                        </Box>
                    ) : (
                        <Flex alignItems="center" justifyContent="space-between" w="full">
                            <Text># {channel.name}</Text>
                            {user?.id === channel.createdBy && channel.createdBy !== 'system' && (
                                <Box>
                                    <IconButton
                                        aria-label="Edit channel"
                                        icon={<EditIcon />}
                                        size="xs"
                                        mr={1}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setNewChannelName(channel.name);
                                            onEditChannel(channel.id);
                                        }}
                                    />
                                    <IconButton
                                        aria-label="Delete channel"
                                        icon={<DeleteIcon />}
                                        size="xs"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteChannel(channel.id);
                                        }}
                                    />
                                </Box>
                            )}
                        </Flex>
                    )}
                </Flex>
            ))}
        </VStack>
    );
};
