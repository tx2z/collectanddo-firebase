import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  collections$: Observable<Collection[]>;

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    ) { }


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
