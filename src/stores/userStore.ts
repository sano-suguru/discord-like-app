import { create } from 'zustand';
import { User, UserProfileFormData } from '../types/user';
import { mockUserApi } from '../api/mockUserApi';

interface UserStore {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (data: UserProfileFormData) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLoading: false,
    error: null,
    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const user = await mockUserApi.getProfile();
            set({ user, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch profile', isLoading: false });
        }
    },
    updateProfile: async (data: UserProfileFormData) => {
        set({ isLoading: true, error: null });
        try {
            const updatedUser = await mockUserApi.updateProfile(data);
            set({ user: updatedUser, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to update profile', isLoading: false });
        }
    },
}));