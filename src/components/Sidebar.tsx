import React from 'react';
import { Box, VStack, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Sidebar: React.FC = () => {
    const channels = ['general', 'random', 'help'];
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box bg="gray.800" w="200px" h="100vh" p={4}>
            <VStack spacing={4} align="stretch">
                <Text color="white" fontSize="xl" fontWeight="bold">Channels</Text>
                {channels.map((channel) => (
                    <Button
                        key={channel}
                        as={Link}
                        to={`/chat/${channel}`}
                        variant="ghost"
                        justifyContent="left"
                        color="gray.300"
                        _hover={{ bg: 'gray.700' }}
                    >
                        # {channel}
                    </Button>
                ))}
                <Box flex={1} />
                <Button colorScheme="red" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </VStack>
        </Box>
    );
};

export default Sidebar;