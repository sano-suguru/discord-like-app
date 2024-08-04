import { useQuery } from '@tanstack/react-query';

import { fetchUser, fetchCurrentUser } from '../api/userApi';
import { UserQueryParams } from '../types/user';
import { useUserStore } from '../stores/userStore';

export const useUserQuery = (params?: UserQueryParams) => {
    const { updateTrigger } = useUserStore();

    return useQuery({
        queryKey: params ? ['/api/users', params.userId] : ['/api/users/me', updateTrigger],
        queryFn: params ? () => fetchUser(params) : fetchCurrentUser,
    });
};
