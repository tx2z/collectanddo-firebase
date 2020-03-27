import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionComponent } from './collection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    CollectionComponent,
  ],
  exports: [
    CollectionComponent,
  ]
})
export class CollectionComponentModule {}
