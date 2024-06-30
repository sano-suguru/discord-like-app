import React, { useEffect, useRef } from 'react';
import { Box, VStack, HStack, Text, Input, Button } from '@chakra-ui/react';
import { useChatStore } from '../store/chatStore';

interface ChatAreaProps {
    channelId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
    const [newMessage, setNewMessage] = React.useState('');
    const { messages, setCurrentChannel, sendMessage } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
            console.log(`ChatArea: Channel ID changed to ${channelId}`); // デバッグ用
        }
    }, [channelId, setCurrentChannel]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages[channelId]]);

    const handleSend = () => {
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <Box flex={1} p={4}>
            <VStack spacing={4} align="stretch" h="calc(100vh - 100px)">
                <Box flex={1} overflowY="auto">
                    {messages[channelId]?.map((message) => (
                        <HStack key={message.id} mb={2}>
                            <Text fontWeight="bold">{message.user}:</Text>
                            <Text>{message.content}</Text>
                        </HStack>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>
                <HStack>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                    />
                    <Button onClick={handleSend}>Send</Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default ChatArea;