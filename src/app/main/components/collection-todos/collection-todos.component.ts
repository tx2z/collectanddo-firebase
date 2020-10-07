import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Collection } from 'src/app/models/collection.model';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { ModalController, IonRouterOutlet, PopoverController } from '@ionic/angular';
import { TodoComponent } from 'src/app/main/components/todo/todo.component';
import { TodoPopoverComponent } from 'src/app/main/components/todo-popover/todo-popover.component';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-collection-todos',
  templateUrl: './collection-todos.component.html',
  styleUrls: ['./collection-todos.component.scss'],
})
export class CollectionTodosComponent implements OnInit {
  @Input() collection: Collection;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  private todosSubscription: Subscription;
  collectionTodoOpen = false;
  showMasonry = false;
  collectionTodos: Todo[];

  constructor(
    private todoService: TodoService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {}

  masonryOptions: NgxMasonryOptions = {
    columnWidth: 310,
    fitWidth: true,
  };

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.collection.currentValue !== changes.collection.previousValue) {
      if (this.collectionTodoOpen) {
        this.closeCollectionTodos();
        this.showMasonry = false;
        this.collectionTodoOpen = false;
      }
      await this.openCollectionTodos();
      this.collectionTodoOpen = true;
    }
  }

  private getCollectionTodos() {
    this.todosSubscription = this.todoService.getCollectionTodos(this.collection.id).subscribe(
      todos => {
        if (todos[0].data.updated != null) {
          this.collectionTodos = todos;
        }
      }
    );
  }

  private async openCollectionTodos() {
    // Wait for animation to end
    setTimeout(() => {
      this.getCollectionTodos();
      // wait until all todos are loaded
      setTimeout(() => {
        console.log('reload');
        this.masonry.reloadItems();
        this.masonry.layout();
        this.showMasonry = true;
      }, 1000);
    }, 500);
  }

  private closeCollectionTodos() {
    this.todosSubscription.unsubscribe();
    this.collectionTodos = null;
  }

  async addNewTodo(ev: Event) {
    ev.stopPropagation();
    const modal = await this.modalController.create({
      component: TodoComponent,
      componentProps: {
        collection: this.collection,
      },
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  async presentPopover(ev: any, todo: Todo) {
    const popover = await this.popoverController.create({
      component: TodoPopoverComponent,
      componentProps: {
        collection: this.collection,
        todo,
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
