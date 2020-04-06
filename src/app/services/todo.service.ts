import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Todo, TodoData } from 'src/app/models/todo.model';
import { CollectionData } from 'src/app/models/collection.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private userCollections: AngularFirestoreCollection<CollectionData>;

  constructor(
    private firebaseFirestone: AngularFirestore,
    private authService: AuthService,
  ) {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.userCollections = this.firebaseFirestone.doc(`users/${user.uid}`)
            .collection<CollectionData>('collections');
        }
      },
    });
  }

  getCollectionTodos(collectionID: string): Observable<Todo[]> {
    return this.userCollections.doc(collectionID)
      .collection<TodoData>('todos', ref =>
        ref
          .orderBy('done', 'asc')
          .orderBy('updatedDesc', 'asc')
      )
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data: TodoData = a.payload.doc.data() as TodoData;
            const id = a.payload.doc.id;
            const ref = a.payload.doc.ref;
            return { id, ref, data };
          });
        })
      );
  }

  addTodo(todo: TodoData, collectionID: string) {
    const creationDate = firestore.FieldValue.serverTimestamp();

    return this.userCollections.doc(collectionID)
      .collection<TodoData>('todos').add({
      ...todo,
      created: creationDate,
      updated: creationDate,
      // Hack to save the timestamp in negative format to order elements
      updatedDesc: -1 * (new Date().getTime()),
    });
  }
}
