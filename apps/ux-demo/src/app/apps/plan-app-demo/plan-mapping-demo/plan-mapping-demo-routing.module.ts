import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanMappingDemoComponent } from './plan-mapping-demo/plan-mapping-demo.component';

const routes: Routes = [
  {
    path: '',
    component: PlanMappingDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanMappingDemoRoutingModule { }
