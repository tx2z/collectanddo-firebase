import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageUploadComponent } from './image-upload.component';
import { FileSizeFormatPipe } from './file-size-format.pipe';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ImageUploadComponent, FileSizeFormatPipe],
  exports: [ImageUploadComponent]
})
export class ImageUploadComponentModule {}
