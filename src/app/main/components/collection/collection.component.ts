import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/models/collection.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  @Input() collection: Collection;

  constructor() { }

  ngOnInit() {}

}
