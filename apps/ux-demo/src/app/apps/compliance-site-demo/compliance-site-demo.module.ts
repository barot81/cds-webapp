import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceSiteDemoRoutingModule } from './compliance-site-demo-routing.module';
import { ComplianceSiteDemoComponent } from './compliance-site-demo.component';
import { ComplianceSiteDemoNavBarComponent } from './compliance-site-demo-nav-bar/compliance-site-demo-nav-bar.component';
import { MaterialModule, FusePipesModule, FuseSharedModule, FuseSidebarModule, LayoutModule, ExxatAvatarModule } from '@exxat/ux';
import { ComplianceAdminRoutingModule } from '../compliance/admin/compliance-admin-routing.module';
import { ExxatComplianceTabNavBarModule } from '../compliance/admin/exxat-compliance-tab-navbar/exxat-compliance-tabnavbar.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [ComplianceSiteDemoComponent, ComplianceSiteDemoNavBarComponent, AdminComponent],
  imports: [
    CommonModule,
    ComplianceSiteDemoRoutingModule,
    CommonModule,
    MaterialModule,
    FusePipesModule,
    FuseSharedModule,
    FuseSidebarModule,
    ComplianceAdminRoutingModule,
    LayoutModule,
    ExxatComplianceTabNavBarModule,
    ExxatAvatarModule
  ]
})
export class ComplianceSiteDemoModule { }



