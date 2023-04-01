import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceSiteDemoComponent } from './compliance-site-demo.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: ComplianceSiteDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'compliance',
        pathMatch: 'full'
      },
      
      {
        path: 'compliance',
        component: AdminComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceSiteDemoRoutingModule { }
