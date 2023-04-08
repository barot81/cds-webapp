import { Routes } from '@angular/router';
import { RoleConfigType } from '@zhealthcare-common/angular-bootstrap-legacy';
import {
  AuthGuardService,
  loadRemoteModuleFromDefinitions,
} from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';
import { navigations } from '../nav/navigations';
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
    path: '**',
    redirectTo: 'dashboard',
  },

];

const roleConfig: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin/remote-legacy-home']
};
export { routes, roleConfig };
