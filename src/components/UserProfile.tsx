import React, { useEffect } from 'react';
import { Box, VStack, Avatar, Text, Spinner } from '@chakra-ui/react';
import { useUserStore } from '../stores/userStore';

export const UserProfile: React.FC = () => {
    const { user, isLoading, error, fetchProfile } = useUserStore();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (isLoading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;
    if (!user) return null;

    return (
        <Box>
            <VStack spacing={4} align="center">
                <Avatar size="2xl" name={user.username} src={user.avatar || undefined} />
                <Text fontSize="2xl" fontWeight="bold">{user.username}</Text>
                <Text>{user.email}</Text>
                <Text>{user.bio}</Text>
            </VStack>
        </Box>
    );
};