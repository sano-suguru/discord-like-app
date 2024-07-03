import React from 'react';
import { Box, HStack, VStack, Text, Link, IconButton, Flex, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { Message } from '../types/message';
import ReactionPicker from './ReactionPicker';

interface MessageItemProps {
    message: Message;
    isOwnMessage: boolean;
    currentUsername: string;
    onEdit: (messageId: string) => void;
    onDelete: (messageId: string) => void;
    onAddReaction: (messageId: string, emoji: string) => void;
    onRemoveReaction: (messageId: string, emoji: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = React.memo(
    ({ message, isOwnMessage, currentUsername, onEdit, onDelete, onAddReaction, onRemoveReaction }) => {
        const handleReaction = (emoji: string) => {
            if (message.reactions[emoji]?.users.includes(currentUsername)) {
                onRemoveReaction(message.id, emoji);
            } else {
                onAddReaction(message.id, emoji);
            }
        };

        return (
            <Flex justifyContent={isOwnMessage ? 'flex-end' : 'flex-start'} mb={2} w="100%">
                <Box maxW="70%" bg={isOwnMessage ? 'blue.100' : 'gray.100'} p={2} borderRadius="md" boxShadow="md">
                    <VStack align="stretch" spacing={1}>
                        <HStack>
                            <Text fontWeight="bold" color={isOwnMessage ? 'blue.600' : 'gray.600'}>
                                {message.username}
                            </Text>
                            {isOwnMessage && <Text fontSize="xs" color="blue.600">(You)</Text>}
                        </HStack>
                        <Text>{message.content}</Text>
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
                                    onClick={() => onEdit(message.id)}
                                />
                                <IconButton
                                    aria-label="Delete message"
                                    icon={<DeleteIcon />}
                                    size="xs"
                                    onClick={() => onDelete(message.id)}
                                />
                            </HStack>
                        )}
                        <HStack wrap="wrap" spacing={1} mt={2}>
                            {message.reactions && Object.entries(message.reactions).map(([emoji, reaction]) => (
                                <Button
                                    key={emoji}
                                    size="xs"
                                    onClick={() => handleReaction(emoji)}
                                    colorScheme={reaction.users.includes(currentUsername) ? 'blue' : 'gray'}
                                >
                                    {emoji} {reaction.count}
                                </Button>
                            ))}
                            <ReactionPicker onSelectEmoji={(emoji) => onAddReaction(message.id, emoji)} />
                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        );
    });

export default MessageItem;