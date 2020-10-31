import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpConfirmPage } from './sign-up-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpConfirmPageRoutingModule {}
