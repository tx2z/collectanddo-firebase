export class User {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
    theme?: Theme;
}

export type Theme = 'light' | 'dark' | 'system';
