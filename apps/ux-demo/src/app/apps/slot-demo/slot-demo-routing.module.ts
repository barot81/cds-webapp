import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlotDemoComponent } from './slot-demo.component';

const routes: Routes = [
  {
    path: 'slot-demo',
    component: SlotDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: SlotDemoComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotDemoRoutingModule { }
