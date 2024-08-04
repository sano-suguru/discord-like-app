import { create } from 'zustand';

import { MockWebSocket } from '../services/webSocket';
import { FileAttachment } from '../types/fileAttachment';
import { Message } from '../types/message';

interface ChatState {
    messages: { [channelId: string]: Message[] };
    currentChannel: string | null;
    webSocket: MockWebSocket | null;
    mentionNotifications: { [username: string]: number };
    addMessage: (channelId: string, message: Message) => void;
    editMessage: (channelId: string, messageId: string, newContent: string) => void;
    deleteMessage: (channelId: string, messageId: string) => void;
    setCurrentChannel: (channelId: string) => void;
    sendMessage: (content: string, username: string, attachment?: FileAttachment) => void;
    addReaction: (channelId: string, messageId: string, emoji: string, username: string) => void;
    removeReaction: (channelId: string, messageId: string, emoji: string, username: string) => void;
    addMentionNotification: (username: string) => void;
    clearMentionNotifications: (username: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: {},
    currentChannel: null,
    webSocket: null,
    mentionNotifications: {},

    addMessage: (channelId, message) =>
        set(state => ({
            messages: {
                ...state.messages,
                [channelId]: [...(state.messages[channelId] || []), message],
            },
        })),

    editMessage: (channelId, messageId, newContent) =>
        set(state => ({
            messages: {
                ...state.messages,
                [channelId]: state.messages[channelId].map(msg =>
                    msg.id === messageId
                        ? { ...msg, content: newContent, isEdited: true }
                        : msg
                ),
            },
        })),

    deleteMessage: (channelId, messageId) =>
        set(state => ({
            messages: {
                ...state.messages,
                [channelId]: state.messages[channelId].filter(msg => msg.id !== messageId),
            },
        })),

    setCurrentChannel: (channelId) => {
        if (!channelId) {
            console.error('Attempted to set undefined channel');
            return;
        }

        const { webSocket, currentChannel } = get();

        if (currentChannel === channelId) {
            return;
        }

        if (webSocket) {
            webSocket.disconnect();
        }

        const newWebSocket = new MockWebSocket(channelId);
        newWebSocket.connect();
        newWebSocket.onMessage((message) => {
            get().addMessage(channelId, message);
        });

        set({
            currentChannel: channelId,
            webSocket: newWebSocket,
            messages: {
                ...get().messages,
                [channelId]: get().messages[channelId] || []
            }
        });

        console.log(`Switched to channel: ${channelId}`);
    },

    sendMessage: (content, username, attachment) => {
        const { currentChannel, webSocket, addMessage, addMentionNotification } = get();
        if (currentChannel && webSocket) {
            webSocket.sendMessage(content);
            const newMessage: Message = {
                id: Date.now().toString(),
                username: username,
                content,
                timestamp: new Date(),
                attachment,
                reactions: {}
            };
            addMessage(currentChannel, newMessage);

            // メンション通知の処理
            const mentionedUsers = content.match(/@(\w+)/g);
            if (mentionedUsers) {
                mentionedUsers.forEach((mention) => {
                    const mentionedUser = mention.slice(1);
                    if (mentionedUser !== username) {
                        addMentionNotification(mentionedUser);
                    }
                });
            }
        } else {
            console.error('Cannot send message: No active channel or WebSocket connection');
        }
    },

    addReaction: (channelId, messageId, emoji, username) =>
        set((state) => {
            const updatedMessages = state.messages[channelId].map((msg) => {
                if (msg.id === messageId) {
                    const updatedReactions = { ...msg.reactions };
                    if (updatedReactions[emoji]) {
                        updatedReactions[emoji] = {
                            ...updatedReactions[emoji],
                            count: updatedReactions[emoji].count + 1,
                            users: [...updatedReactions[emoji].users, username],
                        };
                    } else {
                        updatedReactions[emoji] = { emoji, count: 1, users: [username] };
                    }
                    return { ...msg, reactions: updatedReactions };
                }
                return msg;
            });

            return {
                messages: {
                    ...state.messages,
                    [channelId]: updatedMessages,
                },
            };
        }),

    removeReaction: (channelId, messageId, emoji, username) =>
        set((state) => {
            const updatedMessages = state.messages[channelId].map((msg) => {
                if (msg.id === messageId && msg.reactions[emoji]) {
                    const updatedReaction = {
                        ...msg.reactions[emoji],
                        count: msg.reactions[emoji].count - 1,
                        users: msg.reactions[emoji].users.filter((user) => user !== username),
                    };

                    const updatedReactions = { ...msg.reactions };
                    if (updatedReaction.count === 0) {
                        delete updatedReactions[emoji];
                    } else {
                        updatedReactions[emoji] = updatedReaction;
                    }

                    return { ...msg, reactions: updatedReactions };
                }
                return msg;
            });

            return {
                messages: {
                    ...state.messages,
                    [channelId]: updatedMessages,
                },
            };
        }),

    addMentionNotification: (username) => set((state) => ({
        mentionNotifications: {
            ...state.mentionNotifications,
            [username]: (state.mentionNotifications[username] || 0) + 1,
        },
    })),

    clearMentionNotifications: (username) => set((state) => ({
        mentionNotifications: {
            ...state.mentionNotifications,
            [username]: 0,
        },
    })),
}));
