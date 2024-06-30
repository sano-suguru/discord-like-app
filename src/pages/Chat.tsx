import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

const Chat: React.FC = () => {
    const { channelId } = useParams<{ channelId?: string }>();

    if (!channelId) {
        return <div>Channel not found</div>;
    }

    return (
        <Flex h="100vh">
            <Sidebar />
            <Box flex={1}>
                <ChatArea channelId={channelId} />
            </Box>
        </Flex>
    );
};

export default Chat;