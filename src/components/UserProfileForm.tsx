import React, { useCallback, useEffect } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
    Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Skeleton, Textarea, useToast,
    VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUserQuery } from '../hooks/useUserQuery';
import { useUserStore } from '../stores/userStore';
import { UserProfileFormData } from '../types/user';

const BIO_LENGTH_LIMIT = 500;
const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    bio: yup.string().max(BIO_LENGTH_LIMIT, `Bio must be ${BIO_LENGTH_LIMIT} characters or less`).optional(),
    avatar: yup.mixed()
        .test('fileSize', 'File is too large', (value) => {
            if (value && value instanceof File) {
                return value.size <= FILE_SIZE_LIMIT;
            }
            return true;
        })
        .optional(),
});


export const UserProfileForm: React.FC = () => {
    const { data, isLoading } = useUserQuery();
    const updateUser = useUpdateUser();
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<UserProfileFormData>({
        resolver: yupResolver(schema),
    });

    const { setCurrentUser, triggerUpdate } = useUserStore();
    const toast = useToast();

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const saveChanges = useCallback(async (formData: UserProfileFormData) => {
        try {
            if (!(data?.id)) {
                return;
            }
            const updatedUser = await updateUser.mutateAsync({ ...formData, userId: data.id });
            setCurrentUser(updatedUser);
            triggerUpdate();
            toast({
                title: "Profile updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to update profile",
                description: error instanceof Error ? error.message : 'An unknown error occurred',
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [data?.id, updateUser, setCurrentUser, triggerUpdate, toast]);

    const handleFileChange = useCallback((field: ControllerRenderProps<UserProfileFormData, 'avatar'>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            field.onChange(file);
        }, []
    );

    const handleFileClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = '';
    }, []);

    return (
        <Box as="form" onSubmit={handleSubmit(saveChanges)}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    {isLoading ? <Skeleton height="40px" /> : <Input {...register('username')} />}
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    {isLoading ? <Skeleton height="40px" /> : <Input {...register('email')} />}
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.bio}>
                    <FormLabel>Bio</FormLabel>
                    {isLoading ? <Skeleton height="80px" /> : <Textarea {...register('bio')} />}
                    <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Avatar</FormLabel>
                    <Controller
                        name='avatar'
                        control={control}
                        render={({ field }) => (
                            isLoading
                                ? <Skeleton height="40px" />
                                : <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange(field)}
                                    onClick={handleFileClick}
                                />
                        )}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" isLoading={isSubmitting || isLoading}>
                    Update Profile
                </Button>
            </VStack>
        </Box>
    );
};
