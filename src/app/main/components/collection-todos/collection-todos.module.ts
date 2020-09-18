import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionTodosComponent } from './collection-todos.component';
import { TodoComponentModule } from 'src/app/main/components/todo/todo.module';
import { TodoPopoverComponentModule } from 'src/app/main/components/todo-popover/todo-popover.module';

import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoComponentModule,
    TodoPopoverComponentModule,
    NgxMasonryModule,
  ],
  declarations: [
    CollectionTodosComponent,
  ],
  exports: [
    CollectionTodosComponent,
  ]
})
export class CollectionTodosComponentModule {}
