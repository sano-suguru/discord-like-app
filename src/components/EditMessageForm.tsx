import React, { useCallback, useState } from 'react';

import { Button, HStack, Input } from '@chakra-ui/react';

interface EditMessageFormProps {
    initialContent: string;
    onSave: (newContent: string) => void;
    onCancel: () => void;
}

export const EditMessageForm: React.FC<EditMessageFormProps> = ({ initialContent, onSave, onCancel }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = useCallback(() => {
        const trimmedContent = content.trim();
        if (trimmedContent) {
            onSave(trimmedContent);
        }
    }, [content, onSave]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }, [setContent]);

    return (
        <HStack>
            <Input
                value={content}
                onChange={handleChange}
                placeholder="Edit message..."
            />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </HStack>
    );
};
