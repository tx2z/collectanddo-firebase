import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Todo, TodoData } from 'src/app/models/todo.model';
import { CollectionData } from 'src/app/models/collection.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

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
    const creationDate = firebase.firestore.FieldValue.serverTimestamp();

    return this.userCollections.doc(collectionID).collection<TodoData>('todos')
      .add({
        ...todo,
        created: creationDate,
        updated: creationDate,
        // Hack to save the timestamp in negative format to order elements
        updatedDesc: -1 * (new Date().getTime()),
      });
  }

  updateTodo(todo: TodoData, collectionID: string, todoID: string) {
    const updateDate = firebase.firestore.FieldValue.serverTimestamp();

    return this.userCollections.doc(`${collectionID}/todos/${todoID}`)
      .set({
        ...todo,
        updated: updateDate,
        // Hack to save the timestamp in negative format to order elements
        updatedDesc: -1 * (new Date().getTime()),
      }, { merge: true });
  }

  deleteTodo(collectionID: string, todoID: string) {
    return this.userCollections.doc(`${collectionID}/todos/${todoID}`)
      .delete();
  }

}
