import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceSiteDemoRoutingModule } from './compliance-site-demo-routing.module';
import { ComplianceSiteDemoComponent } from './compliance-site-demo.component';
import { ComplianceSiteDemoNavBarComponent } from './compliance-site-demo-nav-bar/compliance-site-demo-nav-bar.component';
import { MaterialModule, FusePipesModule, FuseSharedModule, FuseSidebarModule, LayoutModule, zhealthcareAvatarModule } from '@zhealthcare/ux';
import { ComplianceAdminRoutingModule } from '../compliance/admin/compliance-admin-routing.module';
import { zhealthcareComplianceTabNavBarModule } from '../compliance/admin/zhealthcare-compliance-tab-navbar/zhealthcare-compliance-tabnavbar.module';
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
    zhealthcareComplianceTabNavBarModule,
    zhealthcareAvatarModule
  ]
})
export class ComplianceSiteDemoModule { }



