import { Routes } from '@angular/router';
import { RoleConfigType } from '@zhealthcare-common/angular-bootstrap-legacy';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';

const routes: Routes = [
  {
    path: 'admin/patients',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.ProfileAdminModule),
    canActivate: [AuthGuardService],
  }
];

const roles: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin/profile'],
};
export { routes, roles };
