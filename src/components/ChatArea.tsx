import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useUserStore } from '../stores/userStore';
import { FileAttachment } from '../types/fileAttachment';
import { Message } from '../types/message';
import { EditMessageForm } from './EditMessageForm';
import { FileUploadButton } from './FileUploadButton';
import { MessageItem } from './MessageItem';
import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';

interface ChatAreaProps {
    channelId: string;
}

export const ChatArea: React.FC<ChatAreaProps> = React.memo(({ channelId }) => {
    const { messages, setCurrentChannel, sendMessage, editMessage, deleteMessage, addReaction, removeReaction } = useChatStore();
    const { isAuthenticated } = useAuthStore();
    const { user } = useUserStore();
    const [newMessage, setNewMessage] = useState('');
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<FileAttachment | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
        }
    }, [channelId, setCurrentChannel]);

    const memorizedMessages = useDeepCompareMemoize(messages[channelId]);
    const [memorizedUser] = useDeepCompareMemoize([user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [memorizedMessages]);

    const handleFileSelect = useCallback((file: File) => {
        const url = URL.createObjectURL(file);
        setAttachment({
            name: file.name,
            url: url,
            type: file.type,
        });
    }, []);

    const handleSend = useCallback(() => {
        if ((newMessage.trim() || attachment) && isAuthenticated && memorizedUser) {
            sendMessage(newMessage, memorizedUser.username, attachment || undefined);
            setNewMessage('');
            setAttachment(null);
        }
    }, [newMessage, attachment, isAuthenticated, memorizedUser, sendMessage]);

    const handleEdit = useCallback((channelId: string, messageId: string, newContent: string) => {
        editMessage(channelId, messageId, newContent);
        setEditingMessageId(null);
    }, [editMessage]);

    const handleDelete = useCallback((messageId: string) => {
        if (window.confirm('このメッセージを削除してもよろしいですか？')) {
            deleteMessage(channelId, messageId);
        }
    }, [channelId, deleteMessage]);

    const messageItems = useMemo(() => {
        return memorizedMessages?.map((message: Message) => (
            <Box key={message.id}>
                {editingMessageId === message.id ? (
                    <EditMessageForm
                        initialContent={message.content}
                        onSave={(newContent) => handleEdit(channelId, message.id, newContent)}
                        onCancel={() => setEditingMessageId(null)}
                    />
                ) : (
                    isAuthenticated && memorizedUser && (
                        <MessageItem
                            message={message}
                            isOwnMessage={message.username === memorizedUser.username}
                            currentUsername={memorizedUser.username}
                            onEdit={setEditingMessageId}
                            onDelete={handleDelete}
                            onAddReaction={(messageId, emoji) => addReaction(channelId, messageId, emoji, memorizedUser.username)}
                            onRemoveReaction={(messageId, emoji) => removeReaction(channelId, messageId, emoji, memorizedUser.username)}
                        />
                    )
                )}
            </Box>
        ));
    }, [memorizedMessages, editingMessageId, isAuthenticated, memorizedUser, channelId, handleEdit, handleDelete, addReaction, removeReaction]);

    return (
        <Box flex={1} p={4}>
            <VStack spacing={4} align="stretch" h="calc(100vh - 100px)">
                <Box flex={1} overflowY="auto">
                    {messageItems}
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
});

ChatArea.displayName = 'ChatArea';
