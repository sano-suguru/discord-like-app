import { useQuery } from '@tanstack/react-query';

import { fetchCurrentUser, fetchUser } from '../api/userApi';
import { useUserStore } from '../stores/userStore';
import { UserQueryParams } from '../types/user';

export const useUserQuery = (params?: UserQueryParams) => {
    const { updateTrigger } = useUserStore();

    return useQuery({
        queryKey: params ? ['/api/users', params.userId] : ['/api/users/me', updateTrigger],
        queryFn: params ? () => fetchUser(params) : fetchCurrentUser,
    });
};
