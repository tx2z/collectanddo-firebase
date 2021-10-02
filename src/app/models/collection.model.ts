import {DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export class CollectionData {
    title: string;
    description?: string;
    type?: string;
    created?: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
    updated?: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
    updatedDesc?: number;
}

export class Collection {
  id: string;
  ref: DocumentReference;
  data: CollectionData;
}

export class CollectionQueryOptions {
    fieldPath: string;
    directionAsc: boolean;
    limit: number;
}
