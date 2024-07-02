import { create } from 'zustand';
import { login as mockLogin } from '../api/mockApi';

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    username: null,
    login: async (username: string, password: string) => {
        try {
            const response = await mockLogin(username, password);
            set({ isAuthenticated: true, username: username }); // ログイン時にユーザー名を保存
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    logout: () => set({ isAuthenticated: false, username: null }), // ログアウト時にユーザー名をリセット
}));
