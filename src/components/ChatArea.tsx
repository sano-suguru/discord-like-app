import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, HStack, Input, VStack, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import EditMessageForm from './EditMessageForm';
import { FileAttachment } from '../types/fileAttachment';
import FileUploadButton from './FileUploadButton';
import MessageItem from './MessageItem';
import { Message } from '../types/message';

interface ChatAreaProps {
    channelId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
    const { messages, setCurrentChannel, sendMessage, editMessage, deleteMessage, addReaction, removeReaction } = useChatStore();
    const { user } = useAuthStore();
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

    const [attachment, setAttachment] = useState<FileAttachment | null>(null);

    const handleFileSelect = async (file: File) => {
        const url = URL.createObjectURL(file);
        setAttachment({
            name: file.name,
            url: url,
            type: file.type,
        });
    };

    const handleSend = () => {
        if ((newMessage.trim() || attachment) && user) {
            sendMessage(newMessage, user.username, attachment || undefined);
            setNewMessage('');
            setAttachment(null);
        }
    };

    const handleEdit = (channelId: string, messageId: string, newContent: string) => {
        editMessage(channelId, messageId, newContent);
        setEditingMessageId(null);
    };

    const handleDelete = (channelId: string, messageId: string) => {
        if (window.confirm('このメッセージを削除してもよろしいですか？')) {
            deleteMessage(channelId, messageId);
        }
    };

    return (
        <Box flex={1} p={4}>
            <VStack spacing={4} align="stretch" h="calc(100vh - 100px)">
                <Box flex={1} overflowY="auto">
                    {messages[channelId]?.map((message: Message) => (
                        <Box key={message.id}>
                            {editingMessageId === message.id ? (
                                <EditMessageForm
                                    initialContent={message.content}
                                    onSave={(newContent) => handleEdit(channelId, message.id, newContent)}
                                    onCancel={() => setEditingMessageId(null)}
                                />
                            ) : (
                                user && <MessageItem
                                    message={message}
                                    isOwnMessage={message.username === user.username}
                                    currentUsername={user.username}
                                    onEdit={(messageId) => setEditingMessageId(messageId)}
                                    onDelete={(messageId) => handleDelete(channelId, messageId)}
                                    onAddReaction={(messageId, emoji) => addReaction(channelId, messageId, emoji, user.username)}
                                    onRemoveReaction={(messageId, emoji) => removeReaction(channelId, messageId, emoji, user.username)}
                                />
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
                    <FileUploadButton onFileSelect={handleFileSelect} />
                    <Button onClick={handleSend}>Send</Button>
                </HStack>
                {attachment && (
                    <Text fontSize="sm">
                        Attached: {attachment.name}{' '}
                        <IconButton
                            aria-label="Remove attachment"
                            icon={<DeleteIcon />}
                            size="xs"
                            onClick={() => setAttachment(null)}
                        />
                    </Text>
                )}
            </VStack>
        </Box>
    );
};

export default ChatArea;
