import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Collection } from 'src/app/models/collection.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  @Input() collection: Collection;
  @Input() openedCollection: Collection;
  @Output() notifyCollection: EventEmitter<Collection> = new EventEmitter<Collection>();

  collectionOpen = false;

  constructor() { }

  ngOnInit() {}

  openCollection() {
    this.notifyCollection.emit(this.collection);
  }

}
