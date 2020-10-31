import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpStatusPageRoutingModule } from './sign-up-status-routing.module';

import { SignUpStatusPage } from './sign-up-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpStatusPageRoutingModule
  ],
  declarations: [SignUpStatusPage]
})
export class SignUpStatusPageModule {}
