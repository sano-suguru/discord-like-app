import { create } from 'zustand';
import { login as mockLogin, logout as mockLogout } from '../api/mockApi';
import { useUserStore } from './userStore';
import { User } from '../types/user';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: async (username: string, password: string) => {
        try {
            const response = await mockLogin(username, password);
            set({
                isAuthenticated: true,
                user: {
                    id: '1', username,
                    email: `${username}@example.com`,
                    bio: 'This is a test bio.'
                }
            });
            await useUserStore.getState().fetchProfile();
            console.log('Login successful:', response);
        } catch (error) {
            await mockLogout();
            useUserStore.setState({ user: null });
            console.error('Login failed:', error);
        }
    },
    logout: async () => {
        set({ isAuthenticated: false, user: null });
        useUserStore.setState({ user: null });
    },
}));
