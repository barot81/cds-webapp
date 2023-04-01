
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanCourseDetailsDemoComponent } from './plan-course-details-demo.component';

const routes: Routes = [
  {
    path: 'plan-course-details-demo',
    component: PlanCourseDetailsDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: PlanCourseDetailsDemoComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanCourseDetailsDemoRoutingModule { }
