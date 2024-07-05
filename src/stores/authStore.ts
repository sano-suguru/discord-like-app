import { create } from 'zustand';
import { login as mockLogin, logout as mockLogout } from '../api/mockApi';
import { useUserStore } from './userStore';
import { User } from '../types/user';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    error: null,
    login: async (username: string, password: string) => {
        try {
            const response = await mockLogin(username, password);
            if (response.success) {
                set({
                    isAuthenticated: true,
                    error: null,
                    user: {
                        id: '1',
                        username,
                        email: `${username}@example.com`,
                        bio: 'This is a test bio.'
                    }
                });
                await useUserStore.getState().fetchProfile();
            } else {
                set({
                    isAuthenticated: false,
                    error: 'ユーザーIDかパスワードが間違っています。',
                    user: null,
                })
                useUserStore.setState({ user: null });
            }
        } catch (error) {
            set({
                isAuthenticated: false,
                error: '認証中にエラーが発生しました。',
                user: null,
            })
            useUserStore.setState({ user: null });
        }
    },
    logout: async () => {
        await mockLogout();
        set({ isAuthenticated: false, user: null });
        useUserStore.setState({ user: null });
    },
}));
