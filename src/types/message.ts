import { FileAttachment } from './fileAttachment';
import { Reaction } from './reaction';

export type Message = Readonly<{
    id: string;
    username: string;
    content: string;
    timestamp: Date;
    isEdited?: boolean;
    attachment?: FileAttachment;
    reactions: { [emoji: string]: Reaction };
}>;
