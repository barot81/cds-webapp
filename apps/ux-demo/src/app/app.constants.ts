import { Routes } from '@angular/router';
import { RoleConfigType } from '@zhealthcare-common/angular-bootstrap-legacy';
import { UserPersona } from '@zhealthcare/fusion/models';

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
