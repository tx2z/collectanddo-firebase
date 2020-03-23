import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectService {
  user: User;

  constructor(
    private storage: Storage,
  ) { }

  getCollections(): Observable<any> {
    const fn = firebase.database().ref('/workers').on('child_added', (snapshot) => {
          return snapshot.val();
    });

    return Observable.bindCallback(fn) as Observable<any>;
  }

  getCollectionsss(): Observable<any> {
    this.storage.get('user').then(userString => {
      this.user = JSON.parse(userString);
      console.log(this.user);

      observer.next({
        test: this.user,
      });
      observer.complete();
    });


    /*
        await userRef.collection('collections').doc('prueba').set({prueba: 'prueba'}, { merge: true })
          .then(() => {
              console.log('Document successfully written!');
          })
          .catch((error) => {
              console.error('Error writing document: ', error);
          });
        */
  })
}
