import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./login/login.module').then( m => m.LoginPageModule)
          },
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./registration/registration.module').then( m => m.RegistrationPageModule)
          },
          {
            path: 'verify-email',
            loadChildren: () =>
              import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
