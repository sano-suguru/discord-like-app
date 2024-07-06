import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, Text, Button, Stack } from '@chakra-ui/react';
import { useAuthStore } from '../stores/authStore';
import { baseUrl } from '../util/baseUrl';

interface NavItemProps {
    to: string;
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to ||
        (to === `${baseUrl}chat` &&
            location.pathname.startsWith(`${baseUrl}chat`));

    return (
        <Link to={to}>
            <Text
                px={2}
                py={1}
                rounded={'md'}
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? 'blue.500' : 'gray.500'}
                _hover={{
                    textDecoration: 'none',
                    bg: 'gray.100',
                }}
            >
                {children}
            </Text>
        </Link>
    );
};

export const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <Box bg="white" px={4} boxShadow="sm">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Stack direction="row" spacing={4}>
                        <NavItem to={baseUrl}>Home</NavItem>
                        {isAuthenticated && (
                            <>
                                <NavItem to={`${baseUrl}chat`}>Chat</NavItem>
                                <NavItem to={`${baseUrl}profile`}>Profile</NavItem>
                            </>
                        )}
                    </Stack>
                </Flex>
                <Flex alignItems="center">
                    {isAuthenticated ? (
                        <Button onClick={logout} colorScheme="red" size="sm">
                            Logout
                        </Button>
                    ) : (
                        <Link to={`${baseUrl}login`}>
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