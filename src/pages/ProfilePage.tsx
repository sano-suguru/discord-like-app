import React from 'react';

import { Box, Divider, Heading, VStack } from '@chakra-ui/react';

import { UserProfile } from '../components/UserProfile';
import { UserProfileForm } from '../components/UserProfileForm';

const ProfilePage: React.FC = () => {
    return (
        <Box maxWidth="600px" margin="auto" padding={8}>
            <VStack spacing={8} align="stretch">
                <Heading as="h1" size="xl" textAlign="center">User Profile</Heading>
                <UserProfile />
                <Divider />
                <Heading as="h2" size="lg">Edit Profile</Heading>
                <UserProfileForm />
            </VStack>
        </Box>
    );
};

export default ProfilePage;