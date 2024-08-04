// components/ChatArea.tsx

import React, { useRef, useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';
import { useChatActions } from '../hooks/useChatActions';
import { FileAttachment } from '../types/fileAttachment';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { AttachmentPreview } from './AttachmentPreview';

interface ChatAreaProps {
    channelId: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
    const {
        messages,
        isAuthenticated,
        currentUser,
        mentionUsers,
        handleSend,
        handleEdit,
        handleDelete,
        handleAddReaction,
        handleRemoveReaction
    } = useChatActions(channelId);

    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<FileAttachment | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const memorizedMessages = useDeepCompareMemoize(messages);
    const [memorizedUser] = useDeepCompareMemoize([currentUser]);

    const handleFileSelect = (file: File) => {
        const url = URL.createObjectURL(file);
        setAttachment({
            name: file.name,
            url: url,
            type: file.type,
        });
    };

    return (
        <Box flex={1} p={4}>
            <VStack spacing={4} align="stretch" h="calc(100vh - 100px)">
                <Box flex={1} overflowY="auto">
                    <MessageList
                        messages={memorizedMessages}
                        currentUsername={memorizedUser?.username || ''}
                        editingMessageId={editingMessageId}
                        onEdit={setEditingMessageId}
                        onDelete={handleDelete}
                        onEditSave={(messageId, newContent) => {
                            handleEdit(messageId, newContent);
                            setEditingMessageId(null);
                        }}
                        onEditCancel={() => setEditingMessageId(null)}
                        onAddReaction={handleAddReaction}
                        onRemoveReaction={handleRemoveReaction}
                    />
                    <div ref={messagesEndRef} />
                </Box>
                <MessageInput
                    onSend={(content, attachment) => {
                        if (isAuthenticated && memorizedUser) {
                            handleSend(content, memorizedUser.username, attachment);
                            setAttachment(null);
                        }
                    }}
                    onFileSelect={handleFileSelect}
                    mentionUsers={mentionUsers}
                />
                {attachment && (
                    <AttachmentPreview
                        attachment={attachment}
                        onRemove={() => setAttachment(null)}
                    />
                )}
            </VStack>
        </Box>
    );
};
