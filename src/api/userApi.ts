import { AuthenticatedUser, UserProfileFormData, UserQueryParams } from '../types/user';
import { delay } from '../util/delay';

const mockUsers: AuthenticatedUser[] = [
    { id: '1', username: 'user1', email: 'user1@example.com', bio: 'I am user 1' },
    { id: '2', username: 'user2', email: 'user2@example.com', bio: 'I am user 2' },
];

export const fetchUser = async ({ userId }: UserQueryParams): Promise<AuthenticatedUser> => {
    await delay(500);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }
    return { ...user };
};

export const updateUser = async (data: UserProfileFormData & UserQueryParams): Promise<AuthenticatedUser> => {
    await delay(500);
    const userIndex = mockUsers.findIndex(u => u.id === data.userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const updatedUser = {
        ...mockUsers[userIndex],
        ...data,
        avatar: data.avatar ? URL.createObjectURL(data.avatar) : mockUsers[userIndex].avatar,
    };
    mockUsers[userIndex] = updatedUser;
    return { ...updatedUser };
};

export const fetchCurrentUser = async (): Promise<AuthenticatedUser> => {
    await delay(500);
    // For mock purposes, always return the first user as the current user
    return { ...mockUsers[0] };
};
