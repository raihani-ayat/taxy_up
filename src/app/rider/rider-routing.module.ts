import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderPage } from './rider.page';

const routes: Routes = [
  {
    path: '',
    component: RiderPage
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderPageRoutingModule {}
