import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Collection } from 'src/app/models/collection.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  collections$: Observable<any[]>;

  constructor(
    private firebaseFirestone: AngularFirestore,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          const userRef: AngularFirestoreDocument<any> = this.firebaseFirestone.doc(`users/${user.uid}`);
          this.collections$ = userRef.collection<Collection>('collections').valueChanges();
        }
      },
    });
  }

}
