import { CalendarView } from './event.model';

export class User {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
    theme?: Theme;
    photoURL64?: string;
    calendarView?: CalendarView;
}

export type Theme = 'light' | 'dark' | 'system';
