import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private firestore: AngularFirestore) { }

  getTodos() {
    return this.firestore.collection('todos').snapshotChanges();
  }

  createTodo(todo: Todo) {
    return this.firestore.collection('todos').add(todo);
  }

  updateTodo(todo: Todo) {
    delete todo.id;
    this.firestore.doc('todos/' + todo.id).update(todo);
  }

  deleteTodo(todoId: string) {
    this.firestore.doc('todos/' + todoId).delete();
  }
}
