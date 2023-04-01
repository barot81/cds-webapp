import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorizontalTreeControlComponent } from './horizontal-tree-control.component';

const routes: Routes = [
  {
    path: 'horizontal-tree-control',
    component: HorizontalTreeControlComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: HorizontalTreeControlComponent
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorizontalTreeControlRoutingModule { }
