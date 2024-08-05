import React, { useCallback, useMemo } from 'react';

import { DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, IconButton, Link, Text, VStack } from '@chakra-ui/react';

import { Message } from '../types/message';
import { ReactionPicker } from './ReactionPicker';

interface MessageItemProps {
    message: Message;
    isOwnMessage: boolean;
    currentUsername: string;
    onEdit: (messageId: string) => void;
    onDelete: (messageId: string) => void;
    onAddReaction: (messageId: string, emoji: string) => void;
    onRemoveReaction: (messageId: string, emoji: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = React.memo(({
    message,
    isOwnMessage,
    currentUsername,
    onEdit,
    onDelete,
    onAddReaction,
    onRemoveReaction
}) => {
    const handleReaction = useCallback((emoji: string) => {
        if (message.reactions[emoji]?.users.includes(currentUsername)) {
            onRemoveReaction(message.id, emoji);
        } else {
            onAddReaction(message.id, emoji);
        }
    }, [message.id, message.reactions, currentUsername, onAddReaction, onRemoveReaction]);

    const handleEdit = useCallback(() => onEdit(message.id), [message.id, onEdit]);
    const handleDelete = useCallback(() => onDelete(message.id), [message.id, onDelete]);
    const handleAddReaction = useCallback((emoji: string) => onAddReaction(message.id, emoji), [message.id, onAddReaction]);

    const messageColor = isOwnMessage ? 'blue' : 'gray';

    const reactionEntries = useMemo(() => Object.entries(message.reactions || {}), [message.reactions]);

    const reactionButtons = useMemo(() => (
        reactionEntries.map(([emoji, reaction]) => (
            <Button
                key={emoji}
                size="xs"
                onClick={() => handleReaction(emoji)}
                colorScheme={reaction.users.includes(currentUsername) ? 'blue' : 'gray'}
            >
                {emoji} {reaction.count}
            </Button>
        ))
    ), [reactionEntries, currentUsername, handleReaction]);

    const renderContent = useMemo(() => {
        return message.content.split(' ').map((word, index) => (
            word.startsWith('@') ? (
                <Text as="span" key={index} fontWeight="bold" color="blue.500">
                    {word}{' '}
                </Text>
            ) : `${word} `
        ));
    }, [message.content]);

    return (
        <Flex justifyContent={isOwnMessage ? 'flex-end' : 'flex-start'} mb={2} w="100%">
            <Box maxW="70%" bg={`${messageColor}.100`} p={2} borderRadius="md" boxShadow="md">
                <VStack align="stretch" spacing={1}>
                    <HStack>
                        <Text fontWeight="bold" color={`${messageColor}.600`}>
                            {message.username}
                        </Text>
                        {isOwnMessage && <Text fontSize="xs" color={`${messageColor}.600`}>(You)</Text>}
                    </HStack>
                    <Text>{renderContent}</Text>
                    {message.isEdited && <Text fontSize="xs" color="gray.500">(edited)</Text>}
                    {message.attachment && (
                        <HStack>
                            <DownloadIcon />
                            <Link href={message.attachment.url} isExternal color="blue.500">
                                {message.attachment.name}
                            </Link>
                        </HStack>
                    )}
                    {isOwnMessage && (
                        <HStack justifyContent="flex-end">
                            <IconButton
                                aria-label="Edit message"
                                icon={<EditIcon />}
                                size="xs"
                                onClick={handleEdit}
                            />
                            <IconButton
                                aria-label="Delete message"
                                icon={<DeleteIcon />}
                                size="xs"
                                onClick={handleDelete}
                            />
                        </HStack>
                    )}
                    <HStack wrap="wrap" spacing={1} mt={2}>
                        {reactionButtons}
                        <ReactionPicker onSelectEmoji={handleAddReaction} />
                    </HStack>
                </VStack>
            </Box>
        </Flex>
    );
});

MessageItem.displayName = 'MessageItem';
