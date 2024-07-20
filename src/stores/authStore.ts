import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    authenticate: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    token: null,
    authenticate: (token) => set({ token, isAuthenticated: true }),
    logout: () => set({ token: null, isAuthenticated: false })
}));
