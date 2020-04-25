import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoPage } from './do.page';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DoPage }]),
    NgCalendarModule,
  ],
  declarations: [
    DoPage
  ]
})
export class DoPageModule {}
