import {DocumentReference } from '@angular/fire/firestore';

export class EventData {
    title: string;
    startTime: Date;
    endTime: Date;
    allDay: boolean;
}

export class Event {
    id: string;
    ref: DocumentReference;
    data: EventData;
}

export class EventRange {
    startTime: Date;
    endTime: Date;
}

export type CalendarView = 'month' | 'week' | 'day';
