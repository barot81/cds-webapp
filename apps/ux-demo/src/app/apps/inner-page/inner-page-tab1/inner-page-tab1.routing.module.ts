import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnerPageTab1Component } from './inner-page-tab1.component';

const routes: Routes = [
  {
    path: '',
    component: InnerPageTab1Component,
    children: [
      {
        path: '',
        redirectTo: 'category1',
        pathMatch: 'full'
      },
      {
        path: 'category1',
        loadChildren: () =>
          import('./page-demo/page-demo.module').then(
            mod => mod.PageDemoModule
          )
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerPagetab1RoutingModule { }
