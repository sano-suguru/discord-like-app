export type Channel = Readonly<{
    id: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    isPrivate: boolean;
}>;
