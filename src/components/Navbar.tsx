import React from 'react';
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <Box bg="gray.100" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Flex alignItems={'center'}>
                    <Link as={RouterLink} to="/" fontWeight="bold" mr={4}>
                        Home
                    </Link>
                    {isAuthenticated && (
                        <>
                            <Link as={RouterLink} to="/chat" mr={4}>
                                Chat
                            </Link>
                            <Link as={RouterLink} to="/profile" mr={4}>
                                Profile
                            </Link>
                        </>
                    )}
                </Flex>
                <Flex alignItems={'center'}>
                    {isAuthenticated ? (
                        <Button onClick={logout} colorScheme="red" size="sm">
                            Logout
                        </Button>
                    ) : (
                        <Link as={RouterLink} to="/login">
                            <Button colorScheme="blue" size="sm">
                                Login
                            </Button>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};