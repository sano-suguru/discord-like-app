export interface Message {
    id: string;
    username: string;
    content: string;
    timestamp: Date;
    isEdited?: boolean;
}