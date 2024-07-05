import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import { useChannelStore } from '../stores/channelStore';

const Chat: React.FC = () => {
    const { channelId } = useParams<{ channelId: string }>();
    const { currentChannel, setCurrentChannel, channels } = useChannelStore();

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
        } else if (channels.length > 0 && !currentChannel) {
            setCurrentChannel(channels[0].id);
        }
    }, [channelId, channels, currentChannel, setCurrentChannel]);

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