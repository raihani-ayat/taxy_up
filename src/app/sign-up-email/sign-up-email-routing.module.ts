import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpEmailPage } from './sign-up-email.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpEmailPageRoutingModule {}
