export type User = Readonly<{
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
}>;

export type UserProfileFormData = Readonly<{
    username: string;
    email: string;
    bio?: string;
    avatar?: File | any;
}>;