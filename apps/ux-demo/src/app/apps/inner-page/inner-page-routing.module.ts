import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnerPageDemoComponent } from './inner-page-demo.component';

const routes: Routes = [
  {
    path: '',
    component: InnerPageDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab1',
        loadChildren: () =>
          import('./inner-page-tab1/inner-page-tab1.module').then(
            mod => mod.InnerPageTab1Module
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerPageRoutingModule { }
