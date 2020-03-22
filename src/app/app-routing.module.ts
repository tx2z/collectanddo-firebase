import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: '',
    redirectTo: '/app/collect',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
