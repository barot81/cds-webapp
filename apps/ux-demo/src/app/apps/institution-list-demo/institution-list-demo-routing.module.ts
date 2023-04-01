import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionListDemoComponent } from './institution-list-demo.component';

const routes: Routes = [
  {
    path: 'institution-list-demo',
    component: InstitutionListDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'institution-list-demo',
        pathMatch: 'full'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionListDemoRoutingModule { }
