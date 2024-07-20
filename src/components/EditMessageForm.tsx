import React, { useCallback, useState } from 'react';

import { Button, HStack, Input } from '@chakra-ui/react';

interface EditMessageFormProps {
    initialContent: string;
    onSave: (newContent: string) => void;
    onCancel: () => void;
}

const EditMessageForm: React.FC<EditMessageFormProps> = ({ initialContent, onSave, onCancel }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = useCallback(() => {
        if (content.trim()) {
            onSave(content);
        }
    }, [content, onSave]);

    return (
        <HStack>
            <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Edit message..."
            />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </HStack>
    );
};

export default EditMessageForm;