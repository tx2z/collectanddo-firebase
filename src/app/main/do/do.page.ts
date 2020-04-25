import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { UserEventData, UserEventRange, CalendarView, UserEvent } from 'src/app/models/event.model';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-do',
  templateUrl: 'do.page.html',
  styleUrls: ['do.page.scss']
})
export class DoPage implements OnInit, OnDestroy {
    @ViewChild(CalendarComponent) calendarComponent: CalendarComponent;
    eventSource: UserEventData[];
    viewTitle: string;

    isToday: boolean;
    calendarMode: string;
    currentDate: Date = new Date();

    eventsSubscription: Subscription;

    constructor(
      private authService: AuthService,
      private eventService: EventService,
    ) { }

    ngOnInit() {
      this.authService.user$.subscribe({
        next: (user) => {
          if (user) {
            this.calendarMode = (user.calendarView || 'month');
          }
        },
      });
    }

    ngOnDestroy() {
      // TODO: Remove loaded events & subscriptions
      this.eventSource = null;
      this.eventsSubscription.unsubscribe();
    }

    ionViewWillEnter() {
      // Go to today when load the page
      if (!this.isToday) {
        this.currentDate = new Date();
        this.isToday = true;
      }
    }

    onRangeChanged(event: UserEventRange) {
      console.log('range changed: startTime: ' + event.startTime + ', endTime: ' + event.endTime);
      this.eventsSubscription = this.eventService.getEvents(event.startTime, event.endTime).subscribe(
        events => {
          this.eventSource = events.map(
            userEvent => {
              const newEvent = JSON.parse(JSON.stringify(userEvent.data));
              newEvent.startTime = (userEvent.data.startTime as firebase.firestore.Timestamp).toDate();
              newEvent.endTime = (userEvent.data.endTime as firebase.firestore.Timestamp).toDate();

              return newEvent;
            }
          );
        }
      );
    }

    onViewTitleChanged(title: string) {
      this.viewTitle = title;
    }

    onEventSelected(event: UserEventData) {
      // TODO: Add event modal
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode: CalendarView) {
        this.calendarMode = mode;
    }

    today() {
        this.currentDate = new Date();
        this.isToday = true;
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event: Date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    markDisabled = (date: Date) => {
        const current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    }

    slideNext() {
      this.calendarComponent.slideNext();
    }
    slidePrev() {
      this.calendarComponent.slidePrev();
    }

}
