import React, { useCallback, useMemo } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger, SimpleGrid } from '@chakra-ui/react';

const emojis = ['👍', '❤️', '😄', '😮', '😢', '😡'] as const;

interface ReactionPickerProps {
    onSelectEmoji: (emoji: string) => void;
}

export const ReactionPicker: React.FC<ReactionPickerProps> = React.memo(({ onSelectEmoji }) => {
    const handleEmojiSelect = useCallback((emoji: string) => {
        onSelectEmoji(emoji);
    }, [onSelectEmoji]);

    const emojiButtons = useMemo(() => (
        emojis.map((emoji) => (
            <Button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
            >
                {emoji}
            </Button>
        ))
    ), [handleEmojiSelect]);

    return (
        <Popover>
            <PopoverTrigger>
                <Button size="sm">
                    Add Reaction
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <SimpleGrid columns={3} spacing={2} p={2}>
                    {emojiButtons}
                </SimpleGrid>
            </PopoverContent>
        </Popover>
    );
});

ReactionPicker.displayName = 'ReactionPicker';
