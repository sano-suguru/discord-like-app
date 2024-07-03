import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, HStack, Input, VStack, Text, IconButton, Link } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore'; // 追加
import EditMessageForm from './EditMessageForm';
import { FileAttachment } from '../types/fileAttachment';
import FileUploadButton from './FileUploadButton';

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

    const [attachment, setAttachment] = useState<FileAttachment | null>(null);

    const handleFileSelect = async (file: File) => {
        // 実際のアプリケーションでは、ここでファイルをサーバーにアップロードし、URLを取得します
        // この例では、ローカルの URL を生成しています
        const url = URL.createObjectURL(file);
        setAttachment({
            name: file.name,
            url: url,
            type: file.type,
        });
    };

    const handleSend = () => {
        if ((newMessage.trim() || attachment) && username) {
            sendMessage(newMessage, username, attachment || undefined);
            setNewMessage('');
            setAttachment(null);
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
                                <VStack align="start">
                                    <HStack>
                                        <Text fontWeight="bold">{message.username}:</Text>
                                        <Text>{message.content}</Text>
                                        {message.isEdited && <Text fontSize="xs">(edited)</Text>}
                                        {message.username === username && (
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
                                    {message.attachment && (
                                        <HStack>
                                            <DownloadIcon />
                                            <Link href={message.attachment.url} isExternal>
                                                {message.attachment.name}
                                            </Link>
                                        </HStack>
                                    )}
                                </VStack>
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
