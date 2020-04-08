import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/models/collection.model';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { ModalController, IonRouterOutlet, PopoverController } from '@ionic/angular';
import { TodoComponent } from 'src/app/main/components/todo/todo.component';
import { TodoPopoverComponent } from 'src/app/main/components/todo-popover/todo-popover.component';

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
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private popoverController: PopoverController,
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

  async addNewTodo() {
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
