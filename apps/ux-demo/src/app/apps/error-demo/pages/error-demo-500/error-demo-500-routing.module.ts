import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorDemo500Component } from './error-demo500.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorDemo500Component
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorDemo500RoutingModule { }
