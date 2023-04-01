import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResizableDemoComponent } from './resizable-demo/resizable-demo.component';

const routes: Routes = [
  {
    path: 'resizable-demo',
    component: ResizableDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResizableDemoRoutingModule { }
