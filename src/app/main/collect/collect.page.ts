import { Component, OnInit } from '@angular/core';
import { CollectService } from 'src/app/services/collect.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {
  private collections$: Observable<any>;

  constructor(
    private collectService: CollectService
  ) {}

  ngOnInit() {
    this.collections$ = this.collectService.getCollections();
  }

}
