import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorDemoComponent } from './error-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorDemoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorDemo404RoutingModule { }
