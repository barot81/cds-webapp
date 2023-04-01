import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawerExamplesDemoComponent } from './drawer-examples-demo.component';
import { AuthGuardService } from '@exxat/fusion/core';

const routes: Routes = [
  {
    path: 'drawer-examples-demo',
    component: DrawerExamplesDemoComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'drawer-examples-demo',
        pathMatch: 'full'
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawerExamplesDemoRoutingModule { }
