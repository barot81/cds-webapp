import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { EvalFormTableComponent } from './eval-form-table/eval-form-table.component';



const routes: Routes = [
  {
    path: '',
    component: EvalFormTableComponent,
    canActivate: [AuthGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequencyBasedEvalFormRoutingModule { }
