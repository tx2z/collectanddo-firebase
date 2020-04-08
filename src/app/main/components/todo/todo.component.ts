import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonInput, IonTextarea, IonSelect, ToastController, IonCheckbox } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { TodoData, Todo } from 'src/app/models/todo.model';
import { CollectionService } from 'src/app/services/collection.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  @Input() collection: Collection;
  @Input() todo: Todo;
  @Input() moveTodo = false;

  @ViewChild('title') title: IonInput;
  @ViewChild('url') url: IonInput;
  @ViewChild('content') content: IonTextarea;
  @ViewChild('collectionSelect') collectionSelect: IonSelect;
  @ViewChild('copy') copy: IonCheckbox;

  collections$: Observable<Collection[]>;

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    private todoService: TodoService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.collections$ = this.collectionService.getCollections();
        }
      },
    });
  }

  async dismiss() {
    return await this.modalController.dismiss();
  }

  async addTodo() {
    let selectedCollection: Collection;
    if (this.collectionSelect?.value) {
      selectedCollection = this.collectionSelect.value;
    } else {
      selectedCollection = this.collection;
    }
    const todo: TodoData = {
      title: this.title.value as string,
      url: this.url.value as string,
      content: this.content.value as string,
      done: false,
    };
    await this.todoService.addTodo(todo, selectedCollection.id);
    const toast = await this.toastController.create({
      message: `Item added to collection ${selectedCollection.data.title}.`,
      duration: 5000
    });
    toast.present();
    return this.dismiss();
  }

  async updateTodo() {
    const todo: TodoData = {
      title: this.title.value as string,
      url: this.url.value as string,
      content: this.content.value as string,
    };
    await this.todoService.updateTodo(todo, this.collection.id, this.todo.id);
    const toast = await this.toastController.create({
      message: `Item ${todo.title} updated.`,
      duration: 5000
    });
    toast.present();
    return this.dismiss();
  }

  async copyTodo() {
    if (!this.copy.checked) {
      this.todoService.deleteTodo(this.collection.id, this.todo.id);
    }

    return this.addTodo();
  }

}
