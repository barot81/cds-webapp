import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationAdminReviewComponent } from './tabs/evaluation-admin-review/evaluation-admin-review.component';
import { EvaluationAdminDemoComponent } from './evaluation-admin-demo.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationAdminDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'review',
        pathMatch: 'full'
      },
      {
        path: 'review',
        component: EvaluationAdminReviewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationAdminDemoRoutingModule { }
