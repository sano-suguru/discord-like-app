export type Reaction = Readonly<{
    emoji: string;
    count: number;
    users: string[];
}>;
