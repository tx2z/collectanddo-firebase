import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';
import { Collection, CollectionQueryOptions, CollectionData } from 'src/app/models/collection.model';
import { filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit, OnDestroy {
  private lastPageReachedSub: Subscription;
  private allCollectionsLoaded = false;

  @ViewChild(IonInfiniteScroll, { static: false}) infiniteScroll: IonInfiniteScroll;
  collections$: Observable<Collection[]>;
  collectionsLoaded = false;
  collectionQueryOptions: CollectionQueryOptions = {
    fieldPath: 'updatedDesc',
    directionAsc: true,
    limit: 20,
  };

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    ) { }

  ngOnDestroy() {
    if (this.lastPageReachedSub) {
      this.lastPageReachedSub.unsubscribe();
    }
  }

  async ngOnInit() {

    this.collectionsInit();

    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.collectionService.find(this.collectionQueryOptions);
        }
      },
    });
  }

  async findNext($event) {
    if (!this.allCollectionsLoaded) {
      setTimeout(async () => {
        this.collectionService.find(this.collectionQueryOptions);
        $event.target.complete();
      }, 500);
    } else {
      $event.target.complete();
    }
  }

  reorderCollections() {
    this.collectionService.clearCollections();
    this.collectionsInit();
    this.collectionQueryOptions.fieldPath = 'order';
    this.collectionService.find(this.collectionQueryOptions);
    this.allCollectionsLoaded = false;
  }

  private collectionsInit() {
    this.collections$ = this.collectionService.watchCollections();

    this.lastPageReachedSub = this.collectionService.watchLastPageReached()
      .subscribe((reached: boolean) => {
        if (reached && this.infiniteScroll) {
          this.collectionsLoaded = true;
          this.allCollectionsLoaded = true;
        }
      });

    this.collectionService.watchCollections().pipe(
        filter(flats => flats !== undefined),
        take(1)).subscribe((items: Collection[]) => {
          this.collectionsLoaded = true;
        });
  }

}
