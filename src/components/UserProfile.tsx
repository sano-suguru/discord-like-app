import React from 'react';

import { Avatar, Box, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';

import { useUserQuery } from '../hooks/useUserQuery';
import { UserBase } from '../types/user';

interface UserProfileProps extends UserBase { }

const UserProfileComponent: React.FC<UserProfileProps> = ({ username, avatar, email, bio }) => (
    <Box>
        <VStack spacing={4} align="center">
            <Avatar size="2xl" name={username} src={avatar} />
            <Text fontSize="2xl" fontWeight="bold">{username}</Text>
            <Text>{email}</Text>
            <Text>{bio || ''}</Text>
        </VStack>
    </Box>
);

interface UserProfileContainerProps {
    userId?: string;
}

export const UserProfile: React.FC<UserProfileContainerProps> = ({ userId }) => {
    const { data, error, isError, isLoading } = useUserQuery(userId ? { userId } : undefined);

    if (isLoading) {
        return (
            <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
        );
    }

    if (isError) {
        return <Text color="red.500">Error: {error.message}</Text>;
    }

    if (!data) return null;

    return <UserProfileComponent {...data} />;
};
