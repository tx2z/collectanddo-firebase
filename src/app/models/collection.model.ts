import {DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export class CollectionData {
    title: string;
    created?: number | firestore.FieldValue;
    updated?: number | firestore.FieldValue;
    updatedDesc?: number;
    description?: string;
    type?: string;
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
