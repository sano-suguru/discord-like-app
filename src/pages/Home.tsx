import React from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Heading, SimpleGrid, Text, useColorModeValue, VStack
} from '@chakra-ui/react';

import { baseUrl } from '../util/baseUrl';

interface Activity {
    id: number;
    text: string;
}

interface Channel {
    id: string;
    name: string;
}

const recentActivities: Activity[] = [
    { id: 1, text: 'New message in #general' },
    { id: 2, text: 'Friend request from User123' },
    { id: 3, text: 'Mentioned in #random' },
];

const popularChannels: Channel[] = [
    { id: 'general', name: 'General' },
    { id: 'random', name: 'Random' },
    { id: 'help', name: 'Help' },
];

export const Home: React.FC = React.memo(() => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const cardBgColor = useColorModeValue('white', 'gray.600');

    return (
        <Box bg={bgColor} minH="100vh" p={8}>
            <VStack spacing={8} align="stretch">
                <Heading>Welcome to Discord-like App</Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                    <Box bg={cardBgColor} p={6} borderRadius="md" shadow="md">
                        <Heading size="md" mb={4}>Recent Activity</Heading>
                        <VStack align="stretch" spacing={2}>
                            {recentActivities.map((activity) => (
                                <Text key={activity.id}>{activity.text}</Text>
                            ))}
                        </VStack>
                    </Box>

                    <Box bg={cardBgColor} p={6} borderRadius="md" shadow="md">
                        <Heading size="md" mb={4}>Popular Channels</Heading>
                        <VStack align="stretch" spacing={2}>
                            {popularChannels.map((channel) => (
                                <Button
                                    key={channel.id}
                                    as={Link}
                                    to={`${baseUrl}chat/${channel.id}`}
                                    variant="ghost"
                                    justifyContent="left"
                                >
                                    # {channel.name}
                                </Button>
                            ))}
                        </VStack>
                    </Box>
                </SimpleGrid>

                <Box bg={cardBgColor} p={6} borderRadius="md" shadow="md">
                    <Heading size="md" mb={4}>Getting Started</Heading>
                    <Text mb={4}>
                        Welcome to our Discord-like app! Here are some tips to get you started:
                    </Text>
                    <VStack align="stretch" spacing={2}>
                        <Text>1. Join a channel from the sidebar or popular channels list</Text>
                        <Text>2. Send messages and interact with other users</Text>
                        <Text>3. Customize your profile in the settings</Text>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
});
