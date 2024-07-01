import React, { useEffect, useRef, useState } from 'react';
import { Box, VStack, HStack, Text, Input, Button, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useChatStore } from '../store/chatStore';
import EditMessageForm from './EditMessageForm';

interface ChatAreaProps {
    channelId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const { messages, setCurrentChannel, sendMessage, editMessage, deleteMessage } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
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

    const handleEdit = (messageId: string, newContent: string) => {
        editMessage(channelId, messageId, newContent);
        setEditingMessageId(null);
    };

    const handleDelete = (messageId: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            deleteMessage(channelId, messageId);
        }
    };

    return (
        <Box flex={1} p={4}>
            <VStack spacing={4} align="stretch" h="calc(100vh - 100px)">
                <Box flex={1} overflowY="auto">
                    {messages[channelId]?.map((message) => (
                        <Box key={message.id} mb={2}>
                            {editingMessageId === message.id ? (
                                <EditMessageForm
                                    initialContent={message.content}
                                    onSave={(newContent) => handleEdit(message.id, newContent)}
                                    onCancel={() => setEditingMessageId(null)}
                                />
                            ) : (
                                <HStack>
                                    <Text fontWeight="bold">{message.user}:</Text>
                                    <Text>{message.content}</Text>
                                    {message.isEdited && <Text fontSize="xs">(edited)</Text>}
                                    <IconButton
                                        aria-label="Edit message"
                                        icon={<EditIcon />}
                                        size="xs"
                                        onClick={() => setEditingMessageId(message.id)}
                                    />
                                    <IconButton
                                        aria-label="Delete message"
                                        icon={<DeleteIcon />}
                                        size="xs"
                                        onClick={() => handleDelete(message.id)}
                                    />
                                </HStack>
                            )}
                        </Box>
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