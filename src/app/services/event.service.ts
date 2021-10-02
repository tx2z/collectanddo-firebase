import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserEventData } from 'src/app/models/event.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private userRef: AngularFirestoreDocument<any>;

  constructor(
    private firebaseFirestone: AngularFirestore,
    private authService: AuthService,
  ) {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.userRef = this.firebaseFirestone.doc(`users/${user.uid}`);
        }
      },
    });
  }

  getEvents(start: Date, end: Date) {
    return this.userRef.collection<UserEventData>('events', ref =>
        ref
          .where('startTime', '>', start)
          .where('startTime', '<', end)
      )
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data: UserEventData = a.payload.doc.data() as UserEventData;
            const id = a.payload.doc.id;
            const ref = a.payload.doc.ref;
            return { id, ref, data };
          })
        )
      );
  }

  addEvent(event: UserEventData) {
    return this.userRef.collection<UserEventData>('events')
      .add(event);
  }

  updateEvent(event: UserEventData, eventID: string) {
    return this.userRef.collection<UserEventData>('events').doc(eventID)
      .set(event, { merge: true });
  }

  deleteEvent(eventID: string) {
    return this.userRef.collection<UserEventData>('events').doc(eventID)
      .delete();
  }

}
