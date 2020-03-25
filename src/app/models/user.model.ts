export class User {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
    theme?: Theme;
    photoURL64?: string;
}

export type Theme = 'light' | 'dark' | 'system';
