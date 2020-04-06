import {DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export class CollectionData {
    title: string;
    description?: string;
    type?: string;
    created?: number | firestore.FieldValue;
    updated?: number | firestore.FieldValue;
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
