import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, QueryFn } from '@angular/fire/compat/firestore';
import { Collection } from 'src/app/models/collection.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  private userRef: AngularFirestoreDocument<any>;
  private collectionData: BehaviorSubject<Collection[]>;
  private collectionLast: any;
  collectionSort = {fieldPath: 'title', directionAsc: true, limit: 2};
  collections$: Observable<Collection[]>;

  constructor(
    private firebaseFirestone: AngularFirestore,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.userRef = this.firebaseFirestone.doc(`users/${user.uid}`);
        }
      },
    });
  }

  // You need to return the doc to get the current cursor.
  getCollections(queryFn?: QueryFn): Observable<any[]> {
    this.collections$.forEach(val => console.log(val));
    return this.userRef.collection<Collection>('collections', queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const doc = a.payload.doc;
          return { id, ...data, doc };
        });
      })
    );
  }

  // In your first query you subscribe to the collection and save the latest entry
  getCollectionsFirst() {
    this.collectionData = new BehaviorSubject([]);
    this.collections$ = this.collectionData.asObservable();

    return this.getCollections(ref => ref
      .orderBy(this.collectionSort.fieldPath, this.collectionSort.directionAsc ? 'asc' : 'desc')
      .limit(this.collectionSort.limit))
      .subscribe(data => {
        this.collectionLast = data[data.length - 1].doc;
        this.collectionData.next(data);
      });
    }

  getCollectionsNext() {
    return this.getCollections(ref => ref
      .orderBy(this.collectionSort.fieldPath, this.collectionSort.directionAsc ? 'asc' : 'desc')
      .startAfter(this.collectionLast)
      .limit(this.collectionSort.limit))
      .subscribe(data => {
        if (data.length) {
          // And save it again for more queries
          this.collectionLast = data[data.length - 1].doc;
          this.collectionData.next(data);
        }
      });
  }

}
