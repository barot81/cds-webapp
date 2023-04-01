import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceDocumentDemoComponent } from './compliance-document-demo.component';

const routes: Routes = [
  {
    path: 'compliance-document-demo',
    component: ComplianceDocumentDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: ComplianceDocumentDemoComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceDocumentDemoRoutingModule { }
