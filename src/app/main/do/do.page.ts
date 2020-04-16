import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { EventData, EventRange, CalendarView } from 'src/app/models/event.model';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-do',
  templateUrl: 'do.page.html',
  styleUrls: ['do.page.scss']
})
export class DoPage implements OnInit, OnDestroy {
    @ViewChild(CalendarComponent) calendarComponent: CalendarComponent;
    eventSource: EventData[];
    viewTitle: string;

    isToday: boolean;
    calendarMode: string;
    currentDate: Date = new Date();

    constructor(
      private authService: AuthService,
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
    }

    ionViewWillEnter() {
      // Go to today when load the page
      if (!this.isToday) {
        this.currentDate = new Date();
        this.isToday = true;
      }
    }

    onRangeChanged(event: EventRange) {
      console.log('range changed: startTime: ' + event.startTime + ', endTime: ' + event.endTime);
      // TODO: Load events from firebase for the given dates
      // this.eventSource = loadedEvents;
    }

    onViewTitleChanged(title: string) {
      this.viewTitle = title;
    }

    onEventSelected(event: EventData) {
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
