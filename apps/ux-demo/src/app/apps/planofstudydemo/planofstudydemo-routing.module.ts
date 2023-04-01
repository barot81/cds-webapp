import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { PlanOfStudyComponent } from './plan-of-study.component';

const routes: Routes = [{
  path: '',
  component: PlanOfStudyComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanofstudydemoRoutingModule { }
