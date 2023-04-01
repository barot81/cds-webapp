import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageDemoComponent } from './page-demo.component';
import { Category1PageDemoComponent } from './category1-page-demo/category1-page-demo.component';


const routes: Routes = [
  {
    path: '',
    component: PageDemoComponent,
    children: [
      {
        path: '',
        component: Category1PageDemoComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDemoRoutingModule { }
