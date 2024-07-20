// ChannelList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';

import { useChannelStore } from '../stores/channelStore';
import { useUserStore } from '../stores/userStore';
import { baseUrl } from '../util/baseUrl';
import EditChannelModal from './EditChannelModal';

export const ChannelList: React.FC = () => {
    const { channels, currentChannel, setCurrentChannel, deleteChannel } = useChannelStore();
    const { user } = useUserStore();
    const navigate = useNavigate();
    const [editingChannel, setEditingChannel] = useState<string | null>(null);

    const handleChannelClick = (channelId: string) => {
        setCurrentChannel(channelId);
        navigate(`${baseUrl}chat/${channelId}`);
    };

    return (
        <VStack align="stretch" spacing={2}>
            {channels.map((channel) => (
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
                                    setEditingChannel(channel.id);
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
            ))}
            <EditChannelModal
                isOpen={!!editingChannel}
                onClose={() => setEditingChannel(null)}
                channelId={editingChannel}
            />
        </VStack>
    );
};