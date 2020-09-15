import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  collections$: Observable<Collection[]>;
  @ViewChild('colletionsSlider', { static: false }) colletionsSlider: IonSlides;
  openedCollection: Collection;
  footerClosed = false;

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    ) { }

  openCollection(collection: Collection) {
    this.openedCollection = collection;
    this.footerClosed = true;
  }

  toggleFooter() {
    if (this.footerClosed) {
      this.footerClosed = false;
    } else {
      this.footerClosed = true;
    }
  }

  slideOpts: any = {
    slidesPerView: 'auto',
    zoom: false,
    grabCursor: true
  };

  async ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.collections$ = this.collectionService.getCollections();
        }
      },
    });
  }

}
