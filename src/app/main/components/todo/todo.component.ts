import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonInput, IonTextarea, IonSelect, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { TodoData } from 'src/app/models/todo.model';
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

  @ViewChild('title') title: IonInput;
  @ViewChild('url') url: IonInput;
  @ViewChild('content') content: IonTextarea;
  @ViewChild('collectionSelect') collectionSelect: IonSelect;

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
    if (this.collection) {
      selectedCollection = this.collection;
    } else {
      selectedCollection = this.collectionSelect.value;
    }
    const todo: TodoData = {
      title: this.title.value as string,
      url: this.url.value as string,
      content: this.content.value as string,
      done: false,
    };
    await this.todoService.addTodo(todo, selectedCollection.id);
    const toast = await this.toastController.create({
      message: `Item added to collection ${selectedCollection.data.title}`,
      duration: 5000
    });
    toast.present();
    return this.dismiss();
  }
}
