import { create } from 'zustand';

import { AuthenticatedUser } from '../types/user';

interface UserStore {
    currentUser: AuthenticatedUser | null;
    setCurrentUser: (user: AuthenticatedUser) => void;
    clearCurrentUser: () => void;
    updateTrigger: number;
    triggerUpdate: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    setCurrentUser: (user: AuthenticatedUser) => set({ currentUser: { ...user } }),
    clearCurrentUser: () => set({ currentUser: null }),
    updateTrigger: 0,
    triggerUpdate: () => set((state) => ({ updateTrigger: state.updateTrigger + 1 })),
}));
