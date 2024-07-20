import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
    Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Spinner, Textarea, VStack, useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUserQuery } from '../hooks/useUserQuery';
import { UserProfileFormData } from '../types/user';
import { useUserStore } from '../stores/userStore'; // import your user store

const BIO_LENGTH_LIMIT = 500;
const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB以下

const schema = yup.object().shape({
    username: yup.string().required('ユーザー名が必須です'),
    email: yup.string().email('無効なメールアドレスです').required('Eメールは必須です'),
    bio: yup.string().max(BIO_LENGTH_LIMIT, `経歴は${BIO_LENGTH_LIMIT}文字以内で入力してください`).optional(),
    avatar: yup.mixed()
        .test('fileSize', 'ファイルが大きすぎます', (value) => {
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

    const { setUser, triggerUpdate } = useUserStore(); // get the setUser method from the store
    const toast = useToast();

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const saveChanges = async (formData: UserProfileFormData) => {
        try {
            const updatedUser = await updateUser.mutateAsync({ ...formData });
            setUser(updatedUser);
            triggerUpdate();
            toast({
                title: "プロフィールが更新されました。",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "更新に失敗しました。",
                description: (error as Error).message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit(saveChanges)}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    {isLoading ? <Spinner /> : <Input {...register('username')} />}
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    {isLoading ? <Spinner /> : <Input {...register('email')} />}
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.bio}>
                    <FormLabel>Bio</FormLabel>
                    {isLoading ? <Spinner /> : <Textarea {...register('bio')} />}
                    <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Avatar</FormLabel>
                    <Controller
                        name='avatar'
                        control={control}
                        render={({ field }) => (
                            isLoading
                                ? <Spinner />
                                : <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                    onClick={(e) => {
                                        (e.target as HTMLInputElement).value = '';
                                    }}
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
