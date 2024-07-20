import React, { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger, SimpleGrid } from '@chakra-ui/react';

const emojis = ['👍', '❤️', '😄', '😮', '😢', '😡'];

interface ReactionPickerProps {
    onSelectEmoji: (emoji: string) => void;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ onSelectEmoji }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <PopoverTrigger>
                <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
                    Add Reaction
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <SimpleGrid columns={3} spacing={2} p={2}>
                    {emojis.map((emoji) => (
                        <Button
                            key={emoji}
                            onClick={() => {
                                onSelectEmoji(emoji);
                                setIsOpen(false);
                            }}
                        >
                            {emoji}
                        </Button>
                    ))}
                </SimpleGrid>
            </PopoverContent>
        </Popover>
    );
};

export default ReactionPicker;