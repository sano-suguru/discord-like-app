import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, FormErrorMessage } from '@chakra-ui/react';
import { useUserStore } from '../stores/userStore';
import { UserProfileFormData } from '../types/user';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    bio: yup.string().max(500, 'Bio must be at most 500 characters').optional(),
});

export const UserProfileForm: React.FC = () => {
    const { user, updateProfile, isLoading, fetchProfile } = useUserStore();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<UserProfileFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                email: user.email,
                bio: user.bio || '',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: UserProfileFormData) => {
        await updateProfile(data);
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input {...register('username')} />
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input {...register('email')} />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.bio}>
                    <FormLabel>Bio</FormLabel>
                    <Textarea {...register('bio')} />
                    <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Avatar</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setValue('avatar', file);
                            }
                        }}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                    Update Profile
                </Button>
            </VStack>
        </Box>
    );
};