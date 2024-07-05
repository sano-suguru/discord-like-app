import { delay } from "../util/delay";

export interface AuthResponse {
    success: boolean;
    token: string | null;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    await delay(500);
    if (username === 'user' && password === 'password') {
        return ({ success: true, token: 'fake-token' });
    } else {
        return ({ success: false, token: null })
    }
};

export const logout = async () => {
    await delay(500);
}
