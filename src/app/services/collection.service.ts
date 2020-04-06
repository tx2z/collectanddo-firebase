import { Injectable } from '@angular/core';
import { Collection, CollectionData, CollectionQueryOptions } from 'src/app/models/collection.model';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {
  private collectionsSubject: BehaviorSubject<Collection[] | undefined> = new BehaviorSubject(undefined);
  private lastPageReached: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private nextQueryAfter: QueryDocumentSnapshot<CollectionData> = null;
  private paginationSubscription: Subscription;
  private findSubscription: Subscription;
  private userRef: AngularFirestoreDocument<any>;
  private reorderCollecPage = new Subject<string>();

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

  getCollections() {
    try {
      const collection: AngularFirestoreCollection<CollectionData> = this.getCollectionQuery(
        ref =>
          ref
            .orderBy('updatedDesc', 'asc')
            .limit(50)
      );
      return collection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data: CollectionData = a.payload.doc.data() as CollectionData;
            const id = a.payload.doc.id;
            const ref = a.payload.doc.ref;
            return { id, ref, data };
          })
        )
      );

    } catch (err) {
      throw err;
    }
  }

  clearCollections() {
    this.collectionsSubject = new BehaviorSubject(undefined);
    this.lastPageReached = new BehaviorSubject(false);
    this.nextQueryAfter = null;
  }

  watchCollections(): Observable<Collection[]> {
    return this.collectionsSubject.asObservable();
  }

  watchLastPageReached(): Observable<boolean> {
    return this.lastPageReached.asObservable();
  }

  find(queryOptions: CollectionQueryOptions) {
    try {
      const collection: AngularFirestoreCollection<CollectionData> = this.getCollectionQuery(
        ref =>
          ref
            .orderBy(queryOptions.fieldPath, queryOptions.directionAsc ? 'asc' : 'desc')
            .startAfter(this.nextQueryAfter)
            .limit(queryOptions.limit)
      );

      this.paginationSubscription = collection
        .get()
        .subscribe(async (first) => {
          this.nextQueryAfter = first.docs[first.docs.length - 1] as QueryDocumentSnapshot<CollectionData>;
          await this.query(collection);
          this.paginationSubscription.unsubscribe();
        });
    } catch (err) {
      throw err;
    }
  }

  private getCollectionQuery(queryFn: QueryFn): AngularFirestoreCollection<CollectionData> {
      return this.userRef.collection<CollectionData>('collections', queryFn);
  }

  private query(collection: AngularFirestoreCollection<CollectionData>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.findSubscription = collection.snapshotChanges().pipe(
          map(actions =>
            actions.map(a => {
              const data: CollectionData = a.payload.doc.data() as CollectionData;
              const id = a.payload.doc.id;
              const ref = a.payload.doc.ref;
              return { id, ref, data };
            })
          )
        ).subscribe(async (items: Collection[]) => {
          await this.addCollections(items);
          this.findSubscription.unsubscribe();
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  private addCollections(items: Collection[]): Promise<void> {
    return new Promise<void>((resolve) => {
      if (!items || items.length <= 0) {
        this.lastPageReached.next(true);
        resolve();
        return;
      }
      this.collectionsSubject.asObservable().pipe(
        take(1)
      ).subscribe((currentCollections: Collection[]) => {
        this.collectionsSubject.next(currentCollections !== undefined ? [...currentCollections, ...items] : [...items]);
        resolve();
      });
    });
  }

  addNewCollection(collection: CollectionData) {
    const creationDate = firestore.FieldValue.serverTimestamp();
    this.userRef.collection<CollectionData>('collections').add({
      ...collection,
      created: creationDate,
      updated: creationDate,
      // Hack to save the timestamp in negative format to order elements
      updatedDesc: -1 * (new Date().getTime()),
    });
  }

  listenReorderCollecAllPage(): Observable<any> {
    return this.reorderCollecPage.asObservable();
  }

  execReorderCollecAllPage() {
    this.reorderCollecPage.next('reorder Collect page');
  }

}
