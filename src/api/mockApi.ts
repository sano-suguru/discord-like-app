import { delay } from "../util/delay";

export const login = async (username: string, password: string) => {
    await delay(500);
    if (username === 'user' && password === 'password') {
        return ({ token: 'fake-token' });
    } else {
        throw new Error('Invalid credentials');
    }
};

export const logout = async () => {
    await delay(500);
}
