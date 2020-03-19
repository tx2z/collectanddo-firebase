import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {}
