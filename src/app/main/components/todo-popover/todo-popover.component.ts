import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo.model';
import { Collection } from 'src/app/models/collection.model';
import { TodoComponent } from 'src/app/main/components/todo/todo.component';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-popover',
  templateUrl: './todo-popover.component.html',
  styleUrls: ['./todo-popover.component.scss'],
})
export class TodoPopoverComponent implements OnInit {
  @Input() collection: Collection;
  @Input() todo: Todo;

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private todoService: TodoService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

  private async todoModal(moveTodo = false) {
    const componentProps = {
      collection: this.collection,
      todo: this.todo,
      moveTodo,
    };
    const modal = await this.modalController.create({
      component: TodoComponent,
      componentProps,
      presentingElement: await this.modalController.getTop()
    });

    return modal.present();
  }

  close() {
    return this.popoverController.dismiss();
  }

  async editTodo() {
    await this.todoModal();
    return this.close();
  }

  async moveTodo() {
    await this.todoModal(true);
    return this.close();
  }

  async deleteTodo() {
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete ${this.todo.data.title}?`,
      message: `This action can't be undone`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete it',
          handler: () => {
            this.todoService.deleteTodo(this.collection.id, this.todo.id);
          }
        }
      ]
    });

    await alert.present();
    return this.close();
  }

}
