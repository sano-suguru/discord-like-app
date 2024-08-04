import React from 'react';

import { Box, VStack } from '@chakra-ui/react';

import { Message } from '../types/message';
import { EditMessageForm } from './EditMessageForm';
import { MessageItem } from './MessageItem';

interface MessageListProps {
    messages: Message[];
    currentUsername: string;
    editingMessageId: string | null;
    onEdit: (messageId: string) => void;
    onDelete: (messageId: string) => void;
    onEditSave: (messageId: string, newContent: string) => void;
    onEditCancel: () => void;
    onAddReaction: (messageId: string, emoji: string) => void;
    onRemoveReaction: (messageId: string, emoji: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    currentUsername,
    editingMessageId,
    onEdit,
    onDelete,
    onEditSave,
    onEditCancel,
    onAddReaction,
    onRemoveReaction
}) => {
    return (
        <VStack spacing={4} align="stretch">
            {messages.map((message) => (
                <Box key={message.id}>
                    {editingMessageId === message.id ? (
                        <EditMessageForm
                            initialContent={message.content}
                            onSave={(newContent) => onEditSave(message.id, newContent)}
                            onCancel={onEditCancel}
                        />
                    ) : (
                        <MessageItem
                            message={message}
                            isOwnMessage={message.username === currentUsername}
                            currentUsername={currentUsername}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddReaction={onAddReaction}
                            onRemoveReaction={onRemoveReaction}
                        />
                    )}
                </Box>
            ))}
        </VStack>
    );
};
