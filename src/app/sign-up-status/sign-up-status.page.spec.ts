import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpStatusPage } from './sign-up-status.page';

describe('SignUpStatusPage', () => {
  let component: SignUpStatusPage;
  let fixture: ComponentFixture<SignUpStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
