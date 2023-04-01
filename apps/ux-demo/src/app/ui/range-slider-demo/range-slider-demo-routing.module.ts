import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RangeSliderExampleOneComponent } from './pages/range-slider-example-one/range-slider-example-one.component';

const routes: Routes = [
  {
    path: 'range-slider-demo',
    component: RangeSliderExampleOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RangeSliderDemoRoutingModule { }
