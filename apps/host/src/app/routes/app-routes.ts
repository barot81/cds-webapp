import { Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { RoleConfigType } from '@zhealthcare/angular-bootstrap';
import {
  AuthGuardService,
  loadRemoteModuleFromDefinitions,
} from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'remote',
        './Module',
        'RemoteEntryModule'
      ),
    canActivate: [AuthGuardService, MsalGuard],
  },
  {
    path: 'admin/ux',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'ux-demo',
        './UxDemoModule',
        'UxDemoModule'
      ),
    canActivate: [AuthGuardService, MsalGuard],
  },
  {
    // Needed for handling redirect after login
    path: 'auth',
    component: MsalRedirectComponent
  },
  {
    // Needed for handling redirect after login
    path: 'login-failed',
    redirectTo: 'account/login'
  },

  {
    path: '**',
    redirectTo: 'account/login',
  },

];

const roleConfig: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin']
};
export { routes, roleConfig };
