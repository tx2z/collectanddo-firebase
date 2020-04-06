import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionComponent } from './collection.component';
import { TodoComponentModule } from 'src/app/main/components/todo/todo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoComponentModule,
  ],
  declarations: [
    CollectionComponent,
  ],
  exports: [
    CollectionComponent,
  ]
})
export class CollectionComponentModule {}
