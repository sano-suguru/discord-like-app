import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser } from '../api/userApi';
import { UserProfileFormData, UserQueryParams } from '../types/user';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters: UserQueryParams) => [...userKeys.lists(), { filters }] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UserProfileFormData & UserQueryParams) => {
            return await updateUser(data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.detail('me') });
        },
    });
};
