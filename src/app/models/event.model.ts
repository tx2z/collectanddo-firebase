import { DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


export class UserEventData {
    title: string;
    startTime: Date | firebase.firestore.Timestamp | firebase.firestore.FieldValue;
    endTime: Date | firebase.firestore.Timestamp | firebase.firestore.FieldValue;
    allDay: boolean;
    id?: string;
}

export class UserEvent {
    id: string;
    ref: DocumentReference;
    data: UserEventData;
}

export class UserEventRange {
    startTime: Date;
    endTime: Date;
}

export type CalendarView = 'month' | 'week' | 'day';
