import { Routes } from '@angular/router';
import { RoleConfigType } from '@exxat-common/angular-bootstrap-legacy';
import {
  AuthGuardService,
  loadRemoteModuleFromDefinitions,
} from '@exxat/fusion/core';
import { UserPersona } from '@exxat/fusion/models';

const routes: Routes = [
  {
    path: 'admin/remote-legacy-home',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'remote-legacy',
        './Module',
        'RemoteEntryModule'
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'student/remote-legacy-home',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'remote-legacy',
        './Module',
        'RemoteEntryModule'
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

const roleConfig: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin/remote-legacy-home'],
  [UserPersona.Student]: ['/student/remote-legacy-home'],
};
export { routes, roleConfig };
