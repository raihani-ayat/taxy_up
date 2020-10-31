import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpEmailPageRoutingModule } from './sign-up-email-routing.module';

import { SignUpEmailPage } from './sign-up-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignUpEmailPageRoutingModule
  ],
  declarations: [SignUpEmailPage]
})
export class SignUpEmailPageModule {}
