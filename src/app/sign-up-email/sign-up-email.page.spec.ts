import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpEmailPage } from './sign-up-email.page';

describe('SignUpEmailPage', () => {
  let component: SignUpEmailPage;
  let fixture: ComponentFixture<SignUpEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
