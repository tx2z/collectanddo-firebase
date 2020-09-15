import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionTodosComponent } from './collection-todos.component';
import { TodoComponentModule } from 'src/app/main/components/todo/todo.module';
import { TodoPopoverComponentModule } from 'src/app/main/components/todo-popover/todo-popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoComponentModule,
    TodoPopoverComponentModule,
  ],
  declarations: [
    CollectionTodosComponent,
  ],
  exports: [
    CollectionTodosComponent,
  ]
})
export class CollectionTodosComponentModule {}
