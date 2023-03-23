import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@zhealthcare-core/angular-oauth-oidc';
import {
  loadRemoteModuleFromDefinitions,
  setBootstrapDefinitions,
} from '@zhealthcare-core/angular-mf';
import { navigations } from '../nav/navigations';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@zhealthcare-common/angular-bootstrap').then(
            (m) => m.zhealthcareAngularBootstrapModule
          ),
        data: { navigations: navigations },
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'remote/dashboard',
    pathMatch: 'full',
  },
];

export const bootstrapChildRoutes: Routes = [
  {
    path: 'remote',
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          loadRemoteModuleFromDefinitions(
            'remote',
            './Module',
            'RemoteEntryModule'
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    setBootstrapDefinitions(bootstrapChildRoutes);
  }
}
