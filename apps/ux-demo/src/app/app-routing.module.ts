import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { AuthGuardService, loadRemoteModuleFromDefinitions } from '@exxat/fusion/core';
import { loadRemoteModule } from '@nrwl/angular/mf';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'account/register',
    loadChildren: () =>
      import('@exxat/account/registration').then((m) => m.RegistrationModule),
  }
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
