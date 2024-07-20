import React from 'react';

import { Avatar, Box, Spinner, Text, VStack } from '@chakra-ui/react';

import { useUserQuery } from '../hooks/useUserQuery';

export const UserProfile: React.FC = () => {
    const { data, error, isError, isLoading } = useUserQuery();

    if (isLoading) return <Spinner />;
    if (isError) return <Text color="red.500">{error.message}</Text>;
    if (!data) return null;

    return (
        <Box>
            <VStack spacing={4} align="center">
                <Avatar size="2xl" name={data.username} src={data.avatar || undefined} />
                <Text fontSize="2xl" fontWeight="bold">{data.username}</Text>
                <Text>{data.email}</Text>
                <Text>{data.bio}</Text>
            </VStack>
        </Box>
    );
};