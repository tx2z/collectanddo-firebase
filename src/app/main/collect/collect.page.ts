import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';
import { IonSlides } from '@ionic/angular';
import { CupertinoPane } from 'cupertino-pane';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  collections$: Observable<Collection[]>;
  @ViewChild('colletionsSlider', { static: false }) colletionsSlider: IonSlides;
  openedCollection: Collection;
  cupertinoPane: CupertinoPane;
  slideOpts: any = {
    slidesPerView: 'auto',
    zoom: false,
    grabCursor: true,
    mousewheel: true,
  };

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    ) {}

  openCollection(collection: Collection) {
    this.openedCollection = collection;
    this.cupertinoPane.moveToBreak('bottom');
    this.cupertinoPane.backdrop({show: false});
  }

  async changeBackdrop() {
    this.cupertinoPane.backdrop({show: (this.cupertinoPane.currentBreak() === 'middle')});
  }

  async ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.collections$ = this.collectionService.getCollections();
        }
      },
    });

    this.cupertinoPane = new CupertinoPane('ion-footer',
      {
        backdrop: true,
        buttonClose: false,
        breaks: {
          top: { enabled: false },
          middle: { enabled: true, height: 360, bounce: true },
          bottom: { enabled: true, height: 120 },
        },
        onTransitionEnd: () => this.changeBackdrop()
      });

    this.cupertinoPane.present({ animate: true });
  }
}
