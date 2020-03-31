import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectAllPage } from './collect-all.page';
import { CollectionComponentModule } from '../components/collection/collection.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CollectAllPage }]),
    CollectionComponentModule,
  ],
  declarations: [CollectAllPage]
})
export class CollectAllPageModule {}
