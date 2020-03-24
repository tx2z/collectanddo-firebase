import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';
import { Collection } from 'src/app/models/collection.model';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  collections$: Observable<any[]>;
  private user: User;

  constructor(
    private storage: Storage,
    private firebaseStorage: AngularFirestore,
  ) { }

  ngOnInit() {
    this.storage.get('user').then((userString) => {
      this.user = JSON.parse(userString);
      const userRef: AngularFirestoreDocument<any> = this.firebaseStorage.doc(`users/${this.user.uid}`);
      this.collections$ = userRef.collection<Collection>('collections').valueChanges();
    });
  }

}
