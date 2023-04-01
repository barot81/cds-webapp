
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { TheCompleteDemoPageComponent } from './the-complete-demo-page.component';

const routes: Routes = [
  {
    path: 'the-complete-demo-page',
    component: TheCompleteDemoPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: TheCompleteDemoPageComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheCompleteDemoPageRoutingModule { }
