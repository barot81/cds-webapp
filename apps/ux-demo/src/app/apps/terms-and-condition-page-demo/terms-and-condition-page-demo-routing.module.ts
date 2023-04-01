import { NgModule } from '@angular/core';
import { TermsAndConditionPageDemoComponent } from './terms-and-condition-page-demo.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@exxat/fusion/core';

const routes: Routes = [{
  path: '',
  component: TermsAndConditionPageDemoComponent,
  canActivate: [AuthGuardService]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsAndConditionPageDemoRoutingModule { }

