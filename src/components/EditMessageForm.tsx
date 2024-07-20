import React, { useState } from 'react';

import { Button, HStack, Input } from '@chakra-ui/react';

interface EditMessageFormProps {
    initialContent: string;
    onSave: (newContent: string) => void;
    onCancel: () => void;
}

const EditMessageForm: React.FC<EditMessageFormProps> = ({ initialContent, onSave, onCancel }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = () => {
        if (content.trim()) {
            onSave(content);
        }
    };

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