import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderPageRoutingModule } from './rider-routing.module';

import { RiderPage } from './rider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderPageRoutingModule
  ],
  declarations: [RiderPage]
})
export class RiderPageModule {}
