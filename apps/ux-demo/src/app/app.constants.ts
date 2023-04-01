import { Routes } from '@angular/router';
import { RoleConfigType } from '@zhealthcare/bootstrap';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';
import { loadRemoteModule } from '@nrwl/angular/mf';

const routes: Routes = [
  {
    path: 'admin/ux',
    loadChildren: () =>
      import('./remote-entry/ux-demo.module').then((mod) => mod.UxDemoModule),
  },
];

const roles: RoleConfigType = {
  [UserPersona.Administrator]: ['/admin/ux'],
};
export { routes, roles };
