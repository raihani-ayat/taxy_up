import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderPage } from './rider.page';

describe('RiderPage', () => {
  let component: RiderPage;
  let fixture: ComponentFixture<RiderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
