import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
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
    canActivate: [AuthGuardService ,MsalGuard],
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
    path: '**',
    redirectTo: 'admin/account/launch',
  },

];

const roleConfig: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin']
};
export { routes, roleConfig };
