import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Todo } from 'src/app/models/todo.model';
import { CollectionData } from 'src/app/models/collection.model';
import { Observable } from 'rxjs';

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
          this.userCollections = this.firebaseFirestone.doc(`users/${user.uid}`).collection<CollectionData>('collections');
        }
      },
    });
  }

  getCollectionTodos(collectionID: string): Observable<Todo[]> {
    return this.userCollections.doc(collectionID).collection<Todo>('todos').valueChanges();
  }
}
