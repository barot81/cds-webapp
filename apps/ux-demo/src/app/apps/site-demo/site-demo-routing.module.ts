import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteDemoComponent } from './site-demo.component';
import { AuthGuardService } from '@exxat/fusion/core';
import { LocationComponent } from './tabs/location/location.component';
import { ContractsComponent } from './tabs/contracts/contracts.component';

const routes: Routes = [
  {
    path: '',
    component: SiteDemoComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'locations',
        pathMatch: 'full'
    },
    {
        path: 'locations',
        component: LocationComponent
    },
    {
      path: 'contracts',
      component: ContractsComponent
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteDemoRoutingModule { }
