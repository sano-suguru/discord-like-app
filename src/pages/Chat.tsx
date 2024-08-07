import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';

import { ChatArea } from '../components/ChatArea';
import { Sidebar } from '../components/Sidebar';
import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';
import { useChannelStore } from '../stores/channelStore';

export const Chat: React.FC = React.memo(() => {
    const { channelId } = useParams<{ channelId: string }>();
    const { currentChannel, setCurrentChannel, channels } = useChannelStore();

    const memorizedChannels = useDeepCompareMemoize(channels);
    const memorizedCurrentChannel = useDeepCompareMemoize([currentChannel]);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
        } else if (memorizedChannels.length > 0 && !memorizedCurrentChannel) {
            setCurrentChannel(memorizedChannels[0].id);
        }
    }, [channelId, memorizedChannels, memorizedCurrentChannel, setCurrentChannel]);

    return (
        <Flex h="100vh">
            <Sidebar />
            <Box flex={1}>
                {currentChannel ? (
                    <ChatArea channelId={currentChannel.id} />
                ) : (
                    <Box p={4}>Please select a channel from the sidebar.</Box>
                )}
            </Box>
        </Flex>
    );
});

Chat.displayName = 'Chat';
