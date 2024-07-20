import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';

import ChatArea from '../components/ChatArea';
import { Sidebar } from '../components/Sidebar';
import { useChannelStore } from '../stores/channelStore';
import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';

const Chat: React.FC = () => {
    const { channelId } = useParams<{ channelId: string }>();
    const { currentChannel, setCurrentChannel, channels } = useChannelStore();

    const memorizedChannels = useDeepCompareMemoize(channels);

    const memorizedCurrentChannel = useDeepCompareMemoize([currentChannel]);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
        } else if (channels.length > 0 && !currentChannel) {
            setCurrentChannel(channels[0].id);
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
};

export default Chat;