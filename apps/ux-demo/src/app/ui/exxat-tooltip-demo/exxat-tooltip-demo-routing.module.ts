import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareTooltipComponent } from './zhealthcare-tooltip/zhealthcare-tooltip.component';
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [
  {
    path:'tooltip',
    component:TooltipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class zhealthcareTooltipDemoRoutingModule { }
