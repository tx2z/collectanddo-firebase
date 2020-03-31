import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/models/collection.model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  @Input() collection: Collection;

  private todosSubscription: Subscription;
  collectionOpen = false;
  collectionTodos: Todo[] = [];


  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit() {}

  private getCollectionTodos() {
    this.todosSubscription = this.todoService.getCollectionTodos(this.collection.id).subscribe(
      todos => this.collectionTodos = todos
    );
  }

  private openCollection() {
    this.getCollectionTodos();
  }

  private closeCollection() {
    this.todosSubscription.unsubscribe();
    this.collectionTodos = [];
  }

  toggleOpenCollection() {
    if (this.collectionOpen) {
      this.closeCollection();
      this.collectionOpen = false;
    } else {
      this.openCollection();
      this.collectionOpen = true;
    }
  }

}
