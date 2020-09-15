import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectPage } from './collect.page';
import { CollectionComponentModule } from '../components/collection/collection.module';
import { CollectionTodosComponentModule } from '../components/collection-todos/collection-todos.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CollectPage }]),
    CollectionComponentModule,
    CollectionTodosComponentModule,
  ],
  declarations: [
    CollectPage
  ]
})
export class CollectPageModule {}
