import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoPopoverComponent } from './todo-popover.component';
import { TodoComponentModule } from 'src/app/main/components/todo/todo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoComponentModule,
  ],
  declarations: [
    TodoPopoverComponent
  ],
  exports: [
    TodoPopoverComponent,
  ]
})
export class TodoPopoverComponentModule {}
