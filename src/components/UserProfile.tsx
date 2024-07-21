import React from 'react';

import { Avatar, Box, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';

import { useUserQuery } from '../hooks/useUserQuery';

interface UserProfileProps {
    username: string;
    avatar?: string;
    email: string;
    bio?: string;
}

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

export const UserProfile = React.memo(() => {
    const { data, error, isError, isLoading } = useUserQuery();

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

    return (
        <UserProfileComponent
            username={data.username}
            avatar={data.avatar}
            email={data.email}
            bio={data.bio}
        />
    );
});
