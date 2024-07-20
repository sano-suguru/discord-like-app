import { create } from 'zustand';

import { User } from '../types/user';

export type UserStore = Readonly<{
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    updateTrigger: number;
    triggerUpdate: () => void;
}>

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => {
        set({ user: { ...user } });
    },
    clearUser: () => {
        set({ user: null });
    },
    updateTrigger: 0,
    triggerUpdate: () => set((state) => ({ updateTrigger: state.updateTrigger + 1 })),
}));
