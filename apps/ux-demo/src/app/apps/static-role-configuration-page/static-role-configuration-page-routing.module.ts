import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { RoleInfoComponent } from './role-info/role-info.component';
import { StaticRoleConfigurationPageComponent } from './static-role-configuration-page.component';
import { StudentInfoComponent } from './student-info/student-info.component';

const routes: Routes = [
  {
    path: '',
    component: StaticRoleConfigurationPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'role-info',
        pathMatch: 'full'
    },
    {
        path: 'role-info',
        component: RoleInfoComponent
    },
    {
      path: 'student-info',
      component: StudentInfoComponent
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoleConfigurationPageRoutingModule { }
