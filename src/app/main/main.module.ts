import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { UserComponentModule } from 'src/app/main/components/user/user.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    UserComponentModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
