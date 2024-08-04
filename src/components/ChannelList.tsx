import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';

import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';
import { useChannelStore } from '../stores/channelStore';
import { useUserStore } from '../stores/userStore';
import { Channel } from '../types/channel';
import { baseUrl } from '../util/baseUrl';
import { EditChannelModal } from './EditChannelModal';

interface ChannelItemProps {
    channel: Channel;
    isCurrentChannel: boolean;
    isCreator: boolean;
    onChannelClick: (channelId: string) => void;
    onEditClick: (channelId: string, event: React.MouseEvent) => void;
    onDeleteClick: (channelId: string, event: React.MouseEvent) => void;
}

const ChannelItem = React.memo<ChannelItemProps>(({
    channel,
    isCurrentChannel,
    isCreator,
    onChannelClick,
    onEditClick,
    onDeleteClick
}) => (
    <Flex
        p={2}
        bg={isCurrentChannel ? 'gray.200' : 'transparent'}
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        onClick={() => onChannelClick(channel.id)}
        _hover={{ bg: 'gray.100' }}
    >
        <Text># {channel.name}</Text>
        {isCreator && channel.createdBy !== 'system' && (
            <Box>
                <IconButton
                    aria-label="Edit channel"
                    icon={<EditIcon />}
                    size="xs"
                    mr={1}
                    onClick={(e) => onEditClick(channel.id, e)}
                />
                <IconButton
                    aria-label="Delete channel"
                    icon={<DeleteIcon />}
                    size="xs"
                    onClick={(e) => onDeleteClick(channel.id, e)}
                />
            </Box>
        )}
    </Flex>
));

ChannelItem.displayName = 'ChannelItem';

export const ChannelList: React.FC = React.memo(() => {
    const { channels, currentChannel, setCurrentChannel, deleteChannel } = useChannelStore();
    const { currentUser } = useUserStore();
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

    const memorizedChannels = useDeepCompareMemoize(channels);

    const editingChannelDetails = useMemo(() => {
        return memorizedChannels.find(c => c.id === editingChannel) || null;
    }, [memorizedChannels, editingChannel]);

    return (
        <VStack align="stretch" spacing={2}>
            {memorizedChannels.map((channel) => (
                <ChannelItem
                    key={channel.id}
                    channel={channel}
                    isCurrentChannel={currentChannel?.id === channel.id}
                    isCreator={currentUser?.id === channel.createdBy}
                    onChannelClick={handleChannelClick}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
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
});

ChannelList.displayName = 'ChannelList';
