import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'collect',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./collect/collect.module').then(m => m.CollectPageModule)
          },
          {
            path: 'all',
            loadChildren: () =>
              import('./collect-all/collect-all.module').then( m => m.CollectAllPageModule)
          },
        ]
      },
      {
        path: 'do',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./do/do.module').then(m => m.DoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/collect',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
