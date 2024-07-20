import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import {
    Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Spinner, Text, VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';

import { AuthResponse, login } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { baseUrl } from '../util/baseUrl';

interface LoginCredentials {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required('ユーザー名は必須です'),
    password: yup.string().required('パスワードは必須です'),
});

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
        resolver: yupResolver(schema),
    });
    const { authenticate, logout } = useAuthStore();

    const navigate = useNavigate();

    const { setUser } = useUserStore()

    const mutation = useMutation<AuthResponse, Error, LoginCredentials>({
        mutationFn: async (credentials) => await login(credentials.username, credentials.password),
        onSuccess: (data) => {
            if (data?.token && data?.user) {
                authenticate(data.token);
                setUser({ ...data.user })
                navigate(baseUrl);
            }
        },
        onError: (error) => {
            console.error(error);
            logout();
        }
    });

    const onSubmit = useCallback(async (data: LoginCredentials) => {
        await mutation.mutateAsync(data)
    }, [mutation.mutateAsync]);

    if (mutation.isPending) return <Spinner />

    return (
        <Box maxWidth="400px" margin="auto" mt={8}>
            {
                mutation.isPending ? (
                    <Spinner />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl isInvalid={!!errors.username}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    {...register('username')}
                                />
                                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    {...register('password')}
                                />
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>
                            {mutation.isError && (
                                <Text color="red.500">{mutation.error.message}</Text>
                            )}
                            <Button type="submit" colorScheme="blue" width="full">
                                Login
                            </Button>
                        </VStack>
                    </form>
                )
            }
        </Box>
    );
};

export default LoginForm;