export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
}

export interface UserProfileFormData {
    username: string;
    email: string;
    bio?: string;
    avatar?: File;
}