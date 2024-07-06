import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, FormErrorMessage } from '@chakra-ui/react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../util/baseUrl';

interface LoginFormData {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required('ユーザー名は必須です'),
    password: yup.string().required('パスワードは必須です'),
});

const LoginForm: React.FC = () => {
    const { login, error } = useAuthStore();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {
        await login(data.username, data.password);
        navigate(baseUrl);
    };

    return (
        <Box maxWidth="400px" margin="auto" mt={8}>
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
                    {error && <Text color="red.500">{error}</Text>}
                    <Button type="submit" colorScheme="blue" width="full">
                        Login
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default LoginForm;