import { User } from '../types/user';
import { delay } from '../util/delay';

const MOCK_TOKEN = 'mock-token';

export interface AuthResponse {
    success: boolean;
    token: string | null;
    user: User | null;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    await delay(500);
    if (username === 'user' && password === 'password') {
        return ({
            success: true, token: MOCK_TOKEN, user: {
                id: '1',
                username,
                email: 'username@example.com',
                bio: 'テスト用の自己紹介です。'
            }
        });
    } else {
        throw new Error('ユーザー名またはパスワードに誤りがあります');
    }
};

export const logout = async () => {
    await delay(500);
};
