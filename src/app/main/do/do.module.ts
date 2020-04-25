import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoPage } from './do.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { EventDetailComponentModule } from 'src/app/main/components/event-detail/event-detail.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DoPage }]),
    NgCalendarModule,
    EventDetailComponentModule,
  ],
  declarations: [
    DoPage
  ]
})
export class DoPageModule {}
