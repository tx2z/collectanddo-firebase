import {DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export class UserEventData {
    title: string;
    startTime: Date | firebase.firestore.Timestamp | firestore.FieldValue;
    endTime: Date | firebase.firestore.Timestamp | firestore.FieldValue;
    allDay: boolean;
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
