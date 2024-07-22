import { useMutation } from '@tanstack/react-query';

import { updateUser } from '../api/userApi';
import { UserProfileFormData } from '../types/user';

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async (formData: UserProfileFormData) => {
            return await updateUser(formData);
        }
    });
};
