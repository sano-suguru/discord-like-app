import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';

import { useChannelStore } from '../stores/channelStore';
import { useUserStore } from '../stores/userStore';
import { baseUrl } from '../util/baseUrl';
import EditChannelModal from './EditChannelModal';
import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';

export const ChannelList: React.FC = () => {
    const { channels, currentChannel, setCurrentChannel, deleteChannel } = useChannelStore();
    const { user } = useUserStore();
    const navigate = useNavigate();
    const [editingChannel, setEditingChannel] = useState<string | null>(null);

    const handleChannelClick = useCallback((channelId: string) => {
        setCurrentChannel(channelId);
        navigate(`${baseUrl}chat/${channelId}`);
    }, [navigate, setCurrentChannel]);

    const handleEditClick = useCallback((channelId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setEditingChannel(channelId);
    }, [setEditingChannel]);

    const handleDeleteClick = useCallback((channelId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        deleteChannel(channelId);
    }, [deleteChannel]);

    const memorizedChannels = useDeepCompareMemoize([channels])

    const editingChannelDetails = useMemo(() => {
        return channels.find(c => c.id === editingChannel) || null;
    }, [memorizedChannels, editingChannel]);

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
                                onClick={(e) => handleEditClick(channel.id, e)}
                            />
                            <IconButton
                                aria-label="Delete channel"
                                icon={<DeleteIcon />}
                                size="xs"
                                onClick={(e) => handleDeleteClick(channel.id, e)}
                            />
                        </Box>
                    )}
                </Flex>
            ))}
            {editingChannel && editingChannelDetails && (
                <EditChannelModal
                    isOpen={!!editingChannel}
                    onClose={() => setEditingChannel(null)}
                    channelId={editingChannel}
                    currentName={editingChannelDetails.name}
                />
            )}
        </VStack>
    );
};