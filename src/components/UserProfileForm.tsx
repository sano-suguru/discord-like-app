import React, { useCallback, useEffect } from 'react';
import { Controller, useForm, Control, UseFormRegister, FieldErrors, ControllerRenderProps } from 'react-hook-form';
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

interface UserProfileFormComponentProps {
    isLoading: boolean;
    control: Control<UserProfileFormData>;
    register: UseFormRegister<UserProfileFormData>;
    errors: FieldErrors<UserProfileFormData>;
}

const UserProfileFormComponent: React.FC<UserProfileFormComponentProps> = ({ isLoading, control, register, errors }) => {
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
        </VStack>
    );
};

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

export const UserProfileForm: React.FC = React.memo(() => {
    const { data, isLoading } = useUserQuery();
    const updateUser = useUpdateUser();
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<UserProfileFormData>({
        resolver: yupResolver(schema),
    });

    const { setUser, triggerUpdate } = useUserStore();
    const toast = useToast();

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const saveChanges = useCallback(async (formData: UserProfileFormData) => {
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
                description: error instanceof Error ? error.message : '不明なエラーが発生しました',
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [updateUser, setUser, triggerUpdate, toast]);

    return (
        <Box as="form" onSubmit={handleSubmit(saveChanges)}>
            <UserProfileFormComponent isLoading={isLoading} control={control} register={register} errors={errors} />
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting || isLoading}>
                プロフィールを更新
            </Button>
        </Box>
    );
});

UserProfileForm.displayName = 'UserProfileForm';
