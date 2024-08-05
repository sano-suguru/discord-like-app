import React, { useRef, useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useChatActions } from '../hooks/useChatActions';
import { useDeepCompareMemoize } from '../hooks/useDeepCompareMemoize';
import { FileAttachment, UploadState } from '../types/fileAttachment';
import { AttachmentPreview } from './AttachmentPreview';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

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
    const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle', progress: 0 });
    const [uploadingFile, setUploadingFile] = useState<File | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const memorizedMessages = useDeepCompareMemoize(messages);
    const [memorizedUser] = useDeepCompareMemoize([currentUser]);

    const uploadFile = async (file: File): Promise<string> => {
        try {
            setUploadState({ status: 'uploading', progress: 0 });
            // Here you would implement the actual file upload process
            // This is a simulated progress update
            for (let i = 0; i <= 10; i++) {
                await new Promise(resolve => setTimeout(resolve, 125));
                setUploadState(prevState => ({ ...prevState, progress: i * 10 }));
            }
            const url = URL.createObjectURL(file); // Replace with actual uploaded URL
            setUploadState({ status: 'complete', progress: 100 });
            return url;
        } catch (error) {
            setUploadState({ status: 'error', progress: 0 });
            throw error;
        }
    };

    const handleFileSelect = async (file: File) => {
        setUploadingFile(file);
        setUploadState({ status: 'uploading', progress: 0 });
        try {
            const url = await uploadFile(file);
            setAttachment({
                name: file.name,
                url: url,
                type: file.type,
                size: file.size,
            });
            setUploadingFile(null);
        } catch (error) {
            console.error('File upload failed:', error);
            setUploadingFile(null);
            setUploadState({ status: 'error', progress: 0 });
            // Here you might want to show an error message to the user
        }
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
                            setUploadState({ status: 'idle', progress: 0 });
                        }
                    }}
                    onFileSelect={handleFileSelect}
                    mentionUsers={mentionUsers}
                />
                {(attachment || uploadingFile) && (
                    <AttachmentPreview
                        attachment={attachment || {
                            name: uploadingFile?.name || '',
                            type: uploadingFile?.type || '',
                            size: uploadingFile?.size || 0,
                            url: ''
                        }}
                        onRemove={() => {
                            setAttachment(null);
                            setUploadingFile(null);
                            setUploadState({ status: 'idle', progress: 0 });
                        }}
                        uploadStatus={uploadState.status}
                        uploadProgress={uploadState.progress}
                    />
                )}
            </VStack>
        </Box>
    );
};
