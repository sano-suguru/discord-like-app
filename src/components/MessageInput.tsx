import React, { useRef, useState } from 'react';
import { Button, HStack, Textarea } from '@chakra-ui/react';
import { FileAttachment } from '../types/fileAttachment';
import { ChatParticipant } from '../types/user';
import { FileUploadButton } from './FileUploadButton';
import { MentionSuggestions } from './MentionSuggestions';
import { useAutoResizeTextArea } from '../hooks/useAutoResizeTextArea';

interface MessageInputProps {
    onSend: (content: string, attachment?: FileAttachment) => void;
    onFileSelect: (file: File) => void;
    mentionUsers: ChatParticipant[];
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, onFileSelect, mentionUsers }) => {
    const [content, setContent] = useState('');
    const [attachment, setAttachment] = useState<FileAttachment | null>(null);
    const [mentionSearch, setMentionSearch] = useState<string | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useAutoResizeTextArea(inputRef, content);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);

        const cursorPosition = e.target.selectionStart || 0;
        const textBeforeCursor = value.slice(0, cursorPosition);
        const words = textBeforeCursor.split(/\s/);
        const lastWord = words[words.length - 1];

        setMentionSearch(lastWord.startsWith('@') ? lastWord.slice(1) : null);
    };

    const handleSelectUser = (username: string) => {
        if (inputRef.current) {
            const cursorPosition = inputRef.current.selectionStart || 0;
            const textBeforeCursor = content.slice(0, cursorPosition);
            const textAfterCursor = content.slice(cursorPosition);
            const words = textBeforeCursor.split(/\s/);
            words[words.length - 1] = `@${username} `;
            const newText = [...words, textAfterCursor].join(' ');
            setContent(newText);
            setMentionSearch(null);

            setTimeout(() => {
                const newCursorPosition = newText.length - textAfterCursor.length;
                inputRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
                inputRef.current?.focus();
            }, 0);
        }
    };

    const handleSend = () => {
        if (content.trim() || attachment) {
            onSend(content, attachment || undefined);
            setContent('');
            setAttachment(null);
        }
    };

    const filteredUsers = mentionUsers.filter(user =>
        !mentionSearch || user.username.toLowerCase().startsWith(mentionSearch.toLowerCase())
    );

    return (
        <HStack position="relative" alignItems="flex-end">
            <Textarea
                ref={inputRef}
                value={content}
                onChange={handleInputChange}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (!e.nativeEvent.isComposing) {
                            handleSend();
                        }
                    }
                }}
                minH="40px"
                maxH="200px"
                overflow="auto"
                resize="none"
                transition="height 0.2s"
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '8px',
                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `rgba(0, 0, 0, 0.15)`,
                        borderRadius: '8px',
                    },
                }}
            />
            {mentionSearch !== null && (
                <MentionSuggestions
                    users={filteredUsers}
                    onSelectUser={handleSelectUser}
                />
            )}
            <FileUploadButton onFileSelect={(file) => {
                onFileSelect(file);
                const url = URL.createObjectURL(file);
                setAttachment({
                    name: file.name,
                    url: url,
                    type: file.type,
                });
            }} />
            <Button onClick={handleSend}>Send</Button>
        </HStack>
    );
};
