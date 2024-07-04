import { User, UserProfileFormData } from '../types/user';
import { useAuthStore } from '../stores/authStore';
import { delay } from '../util/delay';

export const mockUserApi = {
    getProfile: async (): Promise<User> => {
        const authState = useAuthStore.getState();
        await delay(500);
        if (!authState.user) {
            throw new Error('User not authenticated');
        }
        return { ...authState.user };
    },

    updateProfile: async (data: UserProfileFormData): Promise<User> => {
        const authState = useAuthStore.getState();
        await delay(500);
        if (!authState.user) {
            throw new Error('User not authenticated');
        }
        const updatedUser = {
            ...authState.user,
            ...data,
            avatar: data.avatar ? URL.createObjectURL(data.avatar) : authState.user.avatar,
        };
        useAuthStore.setState({ user: updatedUser });
        return updatedUser;
    },
};