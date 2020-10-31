import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
  path: '',
  redirectTo:'home',
  pathMatch:'full',

 },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sign-up-status',
    loadChildren: () => import('./sign-up-status/sign-up-status.module').then( m => m.SignUpStatusPageModule)
  },
  {
    path: 'sign-up-email',
    loadChildren: () => import('./sign-up-email/sign-up-email.module').then( m => m.SignUpEmailPageModule)
  },
  {
    path: 'sign-up-confirm',
    loadChildren: () => import('./sign-up-confirm/sign-up-confirm.module').then( m => m.SignUpConfirmPageModule)
  },
  
  {
    path: 'login-email',
    loadChildren: () => import('./login-email/login-email.module').then( m => m.LoginEmailPageModule)
  },
  {
    path: 'rider',
    loadChildren: () => import('./rider/rider.module').then( m => m.RiderPageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then( m => m.DriverPageModule)
  },
 
  
]
 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
