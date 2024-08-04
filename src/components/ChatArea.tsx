import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';

import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useUserStore } from '../stores/userStore';
import { FileAttachment } from '../types/fileAttachment';
import { Message } from '../types/message';
import { EditMessageForm } from './EditMessageForm';
import { FileUploadButton } from './FileUploadButton';
import { MentionSuggestions } from './MentionSuggestions';
import { MessageItem } from './MessageItem';
import { MockWebSocket } from '../services/webSocket';
import { ChatParticipant } from '../types/user';

interface ChatAreaProps {
    channelId: string;
}

export const ChatArea: React.FC<ChatAreaProps> = React.memo(({ channelId }) => {
    const { messages, setCurrentChannel, sendMessage, editMessage, deleteMessage, addReaction, removeReaction } = useChatStore();
    const { isAuthenticated } = useAuthStore();
    const { currentUser } = useUserStore();
    const [newMessage, setNewMessage] = useState('');
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<FileAttachment | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [mentionSearch, setMentionSearch] = useState<string | null>(null);
    const [mentionUsers, setMentionUsers] = useState<ChatParticipant[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
            // Note: この部分は実際の実装に合わせて調整が必要です
            const mockUsers = MockWebSocket.getChannelUsers();
            setMentionUsers(mockUsers);
        }
    }, [channelId, setCurrentChannel]);

    const memorizedMessages = useDeepCompareMemoize(messages[channelId]);
    const [memorizedUser] = useDeepCompareMemoize([currentUser]);

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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewMessage(value);

        const cursorPosition = e.target.selectionStart || 0;
        const textBeforeCursor = value.slice(0, cursorPosition);
        const words = textBeforeCursor.split(/\s/);
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith('@')) {
            setMentionSearch(lastWord.slice(1));
        } else {
            setMentionSearch(null);
        }
    }, []);

    const handleSelectUser = useCallback((username: string) => {
        if (inputRef.current) {
            const cursorPosition = inputRef.current.selectionStart || 0;
            const textBeforeCursor = newMessage.slice(0, cursorPosition);
            const textAfterCursor = newMessage.slice(cursorPosition);
            const words = textBeforeCursor.split(/\s/);
            words[words.length - 1] = `@${username} `;
            const newText = [...words, textAfterCursor].join(' ');
            setNewMessage(newText);
            setMentionSearch(null);

            // カーソルを適切な位置に移動
            setTimeout(() => {
                const newCursorPosition = newText.length - textAfterCursor.length;
                inputRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
                inputRef.current?.focus();
            }, 0);
        }
    }, [newMessage]);

    const filteredUsers = useMemo(() => {
        if (!mentionSearch) return mentionUsers;
        return mentionUsers.filter(user =>
            user.username.toLowerCase().startsWith(mentionSearch.toLowerCase())
        );
    }, [mentionSearch, mentionUsers]);

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
                <HStack position="relative">
                    <Input
                        ref={inputRef}
                        value={newMessage}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                    />
                    {mentionSearch !== null && (
                        <MentionSuggestions
                            users={filteredUsers}
                            onSelectUser={handleSelectUser}
                        />
                    )}
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
