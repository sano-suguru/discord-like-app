import { create } from 'zustand';
import { Channel } from '../types/channel';
import { v4 as uuidv4 } from 'uuid';

interface ChannelState {
    channels: Channel[];
    currentChannel: Channel | null;
    createChannel: (name: string, description: string, isPrivate: boolean, createdBy: string) => void;
    updateChannel: (id: string, updates: Partial<Channel>) => void;
    deleteChannel: (id: string) => void;
    setCurrentChannel: (id: string) => void;
}

const initialChannels: Channel[] = [
    {
        id: 'general',
        name: 'general',
        description: 'General discussion',
        createdBy: 'system',
        createdAt: new Date(),
        isPrivate: false,
    },
    {
        id: 'help',
        name: 'help',
        description: 'Get help and support',
        createdBy: 'system',
        createdAt: new Date(),
        isPrivate: false,
    },
];

export const useChannelStore = create<ChannelState>((set, get) => ({
    channels: initialChannels,
    currentChannel: initialChannels[0],
    createChannel: (name, description, isPrivate, createdBy) => {
        const newChannel: Channel = {
            id: uuidv4(),
            name,
            description,
            isPrivate,
            createdBy,
            createdAt: new Date(),
        };
        set(state => ({ channels: [...state.channels, newChannel] }));
    },
    updateChannel: (id, updates) => {
        set(state => ({
            channels: state.channels.map(channel =>
                channel.id === id ? { ...channel, ...updates } : channel
            ),
        }));
    },
    deleteChannel: (id) => {
        set(state => ({
            channels: state.channels.filter(channel => channel.id !== id),
            currentChannel: state.currentChannel?.id === id ? initialChannels[0] : state.currentChannel,
        }));
    },
    setCurrentChannel: (id) => {
        const channel = get().channels.find(c => c.id === id);
        if (channel) {
            set({ currentChannel: channel });
        }
    },
}));