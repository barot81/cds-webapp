import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientlogDemoComponent } from './patientlog-demo.component';
import { PatientlogReviewComponent } from './tabs/patientlog-review/patientlog-review.component';
import { PatientlogStatisticsComponent } from './tabs/patientlog-statistics/patientlog-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: PatientlogDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'review',
        pathMatch: 'full'
      },
      {
        path: 'review',
        component: PatientlogReviewComponent
      },

      {
        path: 'statistics',
        component: PatientlogStatisticsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientlogDemoRoutingModule { }
