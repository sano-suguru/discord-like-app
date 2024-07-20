import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '../api/userApi';
import { useUserStore } from '../stores/userStore';

export const useUserQuery = () => {
    const { updateTrigger } = useUserStore();

    return useQuery({
        queryKey: ['/api/user/me', updateTrigger],
        queryFn: fetchUser,
    });
};