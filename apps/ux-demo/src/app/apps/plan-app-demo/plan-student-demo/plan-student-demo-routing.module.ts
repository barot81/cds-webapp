import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanStudentDemoPlanComponent } from './plan-student-demo.component';
import { AuthGuardService } from '@exxat/fusion/core';
import { PlanStudentProfileDemoComponent } from './plan-student-profile-demo/plan-student-profile-demo.component';

const routes: Routes = [
  {
    path: 'plan-student-demo-plan',
    component: PlanStudentDemoPlanComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'profile-demo',
        pathMatch: 'full'
    },
    {
      path: 'profile-demo',
      component: PlanStudentProfileDemoComponent
  },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanStudentDemoRoutingModule { }
