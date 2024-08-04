export interface UserBase {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
}

export interface AuthenticatedUser extends UserBase { }

export interface ChatParticipant extends UserBase {
    personality: 'polite' | 'casual' | 'formal' | 'enthusiastic';
}

export interface UserProfileFormData {
    username: string;
    email: string;
    bio?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    avatar?: File | any;
}

export interface UserQueryParams {
    userId: string;
}
