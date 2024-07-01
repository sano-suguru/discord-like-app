import { create } from 'zustand';

interface AuthState {
    user: { id: string; username: string } | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: async (username, password) => {
        // モックのログイン処理
        if (username === 'user' && password === 'password') {
            set({ user: { id: '1', username }, isAuthenticated: true });
        } else {
            throw new Error('Invalid credentials');
        }
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));