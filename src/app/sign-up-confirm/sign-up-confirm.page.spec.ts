import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpConfirmPage } from './sign-up-confirm.page';

describe('SignUpConfirmPage', () => {
  let component: SignUpConfirmPage;
  let fixture: ComponentFixture<SignUpConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
