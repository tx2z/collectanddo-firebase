import {DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export class TodoData {
    title: string;
    url: string;
    done?: boolean;
    content?: string;
    created?: firebase.firestore.Timestamp | firestore.FieldValue;
    updated?: firebase.firestore.Timestamp | firestore.FieldValue;
    updatedDesc?: number;
}

export class Todo {
    id: string;
    ref: DocumentReference;
    data: TodoData;
}
