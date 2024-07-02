import { create } from 'zustand';
import MockWebSocket from '../services/mockWebSocket';
import { Message } from '../types/message';

interface ChatState {
    messages: { [channelId: string]: Message[] };
    currentChannel: string | null;
    webSocket: MockWebSocket | null;
    addMessage: (channelId: string, message: Message) => void;
    editMessage: (channelId: string, messageId: string, newContent: string) => void;
    deleteMessage: (channelId: string, messageId: string) => void;
    setCurrentChannel: (channelId: string) => void;
    sendMessage: (content: string, username: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: {},
    currentChannel: null,
    webSocket: null,
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

        // 既に同じチャンネルに接続している場合は何もしない
        if (currentChannel === channelId) {
            return;
        }

        // 既存のWebSocket接続を閉じる
        if (webSocket) {
            webSocket.disconnect();
        }

        // 新しいWebSocket接続を作成
        const newWebSocket = new MockWebSocket(channelId);
        newWebSocket.connect();
        newWebSocket.onMessage((message) => {
            get().addMessage(channelId, message);
        });

        // 状態を更新
        set({
            currentChannel: channelId,
            webSocket: newWebSocket,
            // 新しいチャンネルのメッセージ配列を初期化（必要な場合）
            messages: {
                ...get().messages,
                [channelId]: get().messages[channelId] || []
            }
        });

        console.log(`Switched to channel: ${channelId}`); // デバッグ用
    },
    sendMessage: (content, username) => {
        const { currentChannel, webSocket } = get();
        if (currentChannel && webSocket) {
            webSocket.sendMessage(content);
            // 即時に自分のメッセージを追加
            get().addMessage(currentChannel, {
                id: Date.now().toString(),
                username: username,
                content,
                timestamp: new Date(),
            });
        } else {
            console.error('Cannot send message: No active channel or WebSocket connection');
        }
    },
}));