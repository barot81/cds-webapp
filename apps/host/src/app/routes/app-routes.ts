import { Routes } from '@angular/router';
import { RoleConfigType } from '@zhealthcare-common/angular-bootstrap-legacy';
import {
  AuthGuardService,
  loadRemoteModuleFromDefinitions,
} from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';
const routes: Routes = [
  {
    path: 'admin/remote-home',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'remote',
        './Module',
        'RemoteEntryModule'
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/ux',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'ux-demo',
        './UxDemoModule',
        'UxDemoModule'
      ),
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'student/remote-home',
  //   loadChildren: () =>
  //     loadRemoteModuleFromDefinitions(
  //       'remote',
  //       './Module',
  //       'RemoteEntryModule'
  //     ),
  //   canActivate: [AuthGuardService],
  // },
  {
    path: '**',
    redirectTo: 'dashboard',
  },

];

const roleConfig: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin/remote-home']
  // [UserPersona.Student]: ['/student/remote-home'],
};
export { routes, roleConfig };
