import { useUserStore } from '../stores/userStore';
import { User, UserProfileFormData } from '../types/user';
import { delay } from '../util/delay';

export const fetchUser = async (): Promise<User> => {
    await delay(500);
    const user = useUserStore.getState().user;
    if (!user?.id) {
        throw new Error('ユーザーが認証されていません');
    }
    return Promise.resolve({ ...user });
};

export const updateUser = async (data: UserProfileFormData): Promise<User> => {
    await delay(500);
    const user = useUserStore.getState().user;
    if (!user) {
        throw new Error('ユーザーが認証されていません');
    }
    const updatedUser = {
        ...user,
        ...data,
        avatar: data.avatar ? URL.createObjectURL(data.avatar) : user.avatar,
    };
    return Promise.resolve(updatedUser);
};
