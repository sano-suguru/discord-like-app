import React from 'react';

import { Box, List, ListItem } from '@chakra-ui/react';

import { ChatParticipant } from '../types/user';

interface MentionSuggestionsProps {
    users: ChatParticipant[];
    onSelectUser: (username: string) => void;
}

export const MentionSuggestions: React.FC<MentionSuggestionsProps> = ({ users, onSelectUser }) => {
    return (
        <Box position="absolute" bg="white" boxShadow="md" borderRadius="md" zIndex={1}>
            <List spacing={2} p={2}>
                {users.map((user) => (
                    <ListItem
                        key={user.username}
                        cursor="pointer"
                        onClick={() => onSelectUser(user.username)}
                        _hover={{ bg: 'gray.100' }}
                        p={1}
                    >
                        @{user.username}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
