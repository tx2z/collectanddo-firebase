import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonInput, ToastController, IonCheckbox, IonDatetime } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserEventData, UserEvent } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input() event: UserEvent;

  @ViewChild('title') title: IonInput;
  @ViewChild('startTime') startTime: IonDatetime;
  @ViewChild('endTime') endTime: IonDatetime;
  @ViewChild('allDay') allDay: IonCheckbox;

  forceEndTime: string;
  dateMin: string;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    const today = new Date();
    this.dateMin = today.toISOString();
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {

        }
      },
    });
  }

  async dismiss() {
    return await this.modalController.dismiss();
  }

  private dateClean(date: string) {
    const returnDate = new Date(date);
    returnDate.setSeconds(0);
    returnDate.setMilliseconds(0);

    return returnDate;
  }

  setEndTime() {
    const newEndTime = this.dateClean(this.startTime.value as string);
    newEndTime.setHours( newEndTime.getHours() + 1 );
    this.forceEndTime = newEndTime.toISOString();
  }

  async addEvent() {
    const event: UserEventData = {
      title: this.title.value as string,
      startTime: this.dateClean(this.startTime.value as string),
      endTime: this.dateClean(this.endTime.value as string),
      allDay: this.allDay.checked ? true : false,
    };
    await this.eventService.addEvent(event);
    const toast = await this.toastController.create({
      message: `Event ${event.title} added.`,
      duration: 5000
    });
    toast.present();
    return this.dismiss();
  }

  async updateEvent() {
    const event: UserEventData = {
      title: this.title.value as string,
      startTime: this.dateClean(this.startTime.value as string),
      endTime: this.dateClean(this.endTime.value as string),
      allDay: this.allDay.checked ? true : false,
    };
    await this.eventService.updateEvent(event, this.event.id);
    const toast = await this.toastController.create({
      message: `Event ${event.title} updated.`,
      duration: 5000
    });
    toast.present();
    return this.dismiss();
  }

  async deleteEvent() {
    // TODO: Add Are you sure?
    return  this.eventService.deleteEvent(this.event.id);
  }

}
