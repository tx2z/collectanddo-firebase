import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserComponent } from './user.component';
import { ImageUploadComponentModule } from '../image-upload/image-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageUploadComponentModule,
  ],
  declarations: [UserComponent]
})
export class UserComponentModule {}
