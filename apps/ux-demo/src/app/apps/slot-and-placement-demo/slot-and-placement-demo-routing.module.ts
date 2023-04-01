import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlotAndPlacementDemoComponent } from './slot-and-placement-demo.component';

const routes: Routes = [
  {
    path: 'slot-and-placement-demo',
    component: SlotAndPlacementDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'slot-and-placement-demo',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotAndPlacementDemoRoutingModule { }





