import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageDemoComponent } from './landing-page-demo.component';

const routes: Routes = [
  {
    path: 'landing-page-demo',
    component: LandingPageDemoComponent,
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageDemoRoutingModule { }
