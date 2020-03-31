import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectAllPage } from './collect-all.page';

describe('CollectAllPage', () => {
  let component: CollectAllPage;
  let fixture: ComponentFixture<CollectAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
