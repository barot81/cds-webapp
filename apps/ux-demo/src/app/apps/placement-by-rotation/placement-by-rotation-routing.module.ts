import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacementByRotationComponent } from './placement-by-rotation.component';

const routes: Routes = [
  {
    path: 'placement-by-rotation-demo',
    component: PlacementByRotationComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: PlacementByRotationComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacementByRotationRoutingModule { }
