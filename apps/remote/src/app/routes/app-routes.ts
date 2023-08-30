import { Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { RoleConfigType } from '@zhealthcare/angular-bootstrap';
import {
  AuthGuardService,
} from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
    import('../remote-entry/entry.module').then(
      (m) => m.RemoteEntryModule
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
