import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoleConfigurationPageRoutingModule } from './static-role-configuration-page-routing.module';
import { StaticRoleConfigurationPageComponent } from './static-role-configuration-page.component';
import { DemoNavbarComponent } from './demo-navbar/demo-navbar.component';
import { zhealthcareAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleInfoComponent } from './role-info/role-info.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StaticRoleConfigurationDrawerDemoComponent } from './static-role-configuration-drawer-demo/static-role-configuration-drawer-demo.component';

@NgModule({
  declarations: [StaticRoleConfigurationPageComponent, DemoNavbarComponent, RoleInfoComponent, StudentInfoComponent, StaticRoleConfigurationDrawerDemoComponent],
  imports: [
    CommonModule,
    StaticRoleConfigurationPageRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    zhealthcareAvatarModule,
  ]
})
export class StaticRoleConfigurationPageModule { }
