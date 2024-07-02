import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, HStack, Input, VStack, Text, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore'; // 追加
import EditMessageForm from './EditMessageForm';

interface ChatAreaProps {
    channelId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
    const { messages, setCurrentChannel, sendMessage, editMessage, deleteMessage } = useChatStore();
    const { username } = useAuthStore(); // 追加
    const [newMessage, setNewMessage] = useState('');
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
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
        if (newMessage.trim() && username) {
            sendMessage(newMessage, username);
            setNewMessage('');
        }
    };

    const handleEdit = (channelId: string, messageId: string, newContent: string) => {
        editMessage(channelId, messageId, newContent);
        setEditingMessageId(null);
    };

    const handleDelete = (channelId: string, messageId: string) => {
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
                                    onSave={(newContent) => handleEdit(channelId, message.id, newContent)}
                                    onCancel={() => setEditingMessageId(null)}
                                />
                            ) : (
                                <HStack>
                                    <Text fontWeight="bold">{message.username}:</Text>
                                    <Text>{message.content}</Text>
                                    {message.isEdited && <Text fontSize="xs">(edited)</Text>}
                                    {message.username === username && ( // 追加
                                        <>
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
                                                onClick={() => handleDelete(channelId, message.id)}
                                            />
                                        </>
                                    )}
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
                        onKeyDown={(e) => {
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
