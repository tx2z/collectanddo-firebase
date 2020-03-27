import {DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export class CollectionData {
    title: string;
    order: number;
    created?: number | firestore.FieldValue;
    updated?: number | firestore.FieldValue;
    todos?: string[];
    description?: string;
    image?: string;
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
