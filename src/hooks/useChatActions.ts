import { useState, useEffect } from 'react';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { FileAttachment } from '../types/fileAttachment';
import { ChatParticipant } from '../types/user';
import { MockWebSocket } from '../services/webSocket';

export const useChatActions = (channelId: string) => {
    const { messages, setCurrentChannel, sendMessage, editMessage, deleteMessage, addReaction, removeReaction } = useChatStore();
    const { isAuthenticated } = useAuthStore();
    const { currentUser } = useUserStore();
    const [mentionUsers, setMentionUsers] = useState<ChatParticipant[]>([]);

    useEffect(() => {
        if (channelId) {
            setCurrentChannel(channelId);
            const mockUsers = MockWebSocket.getChannelUsers();
            setMentionUsers(mockUsers);
        }
    }, [channelId, setCurrentChannel]);

    const handleSend = async (content: string, username: string, attachment?: FileAttachment) => {
        if (isAuthenticated && currentUser) {
            try {
                await sendMessage(content, username, attachment);
            } catch (error) {
                console.error('Failed to send message:', error);
                // ここでユーザーにエラーを通知する処理を追加
            }
        }
    };

    const handleEdit = async (messageId: string, newContent: string) => {
        try {
            await editMessage(channelId, messageId, newContent);
        } catch (error) {
            console.error('Failed to edit message:', error);
            // ここでユーザーにエラーを通知する処理を追加
        }
    };

    const handleDelete = async (messageId: string) => {
        if (window.confirm('このメッセージを削除してもよろしいですか？')) {
            try {
                await deleteMessage(channelId, messageId);
            } catch (error) {
                console.error('Failed to delete message:', error);
                // ここでユーザーにエラーを通知する処理を追加
            }
        }
    };

    const handleAddReaction = (messageId: string, emoji: string) => {
        if (currentUser) {
            addReaction(channelId, messageId, emoji, currentUser.username);
        }
    };

    const handleRemoveReaction = (messageId: string, emoji: string) => {
        if (currentUser) {
            removeReaction(channelId, messageId, emoji, currentUser.username);
        }
    };

    return {
        messages: messages[channelId] || [],
        isAuthenticated,
        currentUser,
        mentionUsers,
        handleSend,
        handleEdit,
        handleDelete,
        handleAddReaction,
        handleRemoveReaction
    };
};
