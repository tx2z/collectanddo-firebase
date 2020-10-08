import { Component, OnInit, Input } from '@angular/core';
import { UserEventData } from 'src/app/models/event.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  @Input() event: UserEventData;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.event);
  }

  async dismiss() {
    return await this.modalController.dismiss();
  }

}
