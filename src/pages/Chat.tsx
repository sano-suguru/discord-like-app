// src/pages/Chat.tsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

const Chat: React.FC = () => {
    const { channelId } = useParams<{ channelId?: string }>();

    return (
        <Flex h="100vh">
            <Sidebar />
            <Box flex={1}>
                {channelId ? (
                    <ChatArea channelId={channelId} />
                ) : (
                    <Box p={4}>Please select a channel from the sidebar.</Box>
                )}
            </Box>
        </Flex>
    );
};

export default Chat;