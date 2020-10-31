import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpStatusPage } from './sign-up-status.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpStatusPageRoutingModule {}
