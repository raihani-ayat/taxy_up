import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpConfirmPageRoutingModule } from './sign-up-confirm-routing.module';

import { SignUpConfirmPage } from './sign-up-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpConfirmPageRoutingModule
  ],
  declarations: [SignUpConfirmPage]
})
export class SignUpConfirmPageModule {}
