import { v4 as uuidv4 } from 'uuid';

export interface Message {
    id: string;
    user: string;
    content: string;
    timestamp: Date;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessage = async (channelId: string, content: string): Promise<Message> => {
    await delay(500); // Simulate network delay
    return {
        id: uuidv4(),
        user: 'Current User',
        content,
        timestamp: new Date(),
    };
};