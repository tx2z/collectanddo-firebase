import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'collect',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./collect/collect.module').then(m => m.CollectPageModule)
          }
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
export class TabsPageRoutingModule {}
