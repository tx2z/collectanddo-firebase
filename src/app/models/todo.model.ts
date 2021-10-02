import { DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


export class TodoData {
  url: string;
  title: string;
  description?: string;
  site?: string;
  image?: string;
  content?: string;

  done?: boolean;
  created?: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  updated?: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  updatedDesc?: number;
}

export class Todo {
  id: string;
  ref: DocumentReference;
  data: TodoData;
}

export type HasMetadata = 'yes' | 'no' | 'loading';
