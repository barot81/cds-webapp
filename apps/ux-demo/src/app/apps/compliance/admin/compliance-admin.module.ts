import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MaterialModule,
  FuseSharedModule,
  FuseSidebarModule,
  LayoutModule,
  FusePipesModule,
} from '@zhealthcare/ux';
import { ComplianceAdminRoutingModule } from './compliance-admin-routing.module';
import { ComplianceAdminComponent } from './compliance-admin/compliance-admin.component';
import { ComplianceManagementSummaryComponent } from './compliance-management-summary/compliance-management-summary.component';
import { zhealthcareComplianceTabNavBarModule } from './zhealthcare-compliance-tab-navbar/zhealthcare-compliance-tabnavbar.module';
import { ComplianceReviewComponent } from './compliance-review/compliance-review.component';
import { ComplianceNotificationComponent } from './compliance-notification/compliance-notification.component';
import { EvaluationReviewComponent } from './evaluation-review/evaluation-review.component';
import { ComplianceManagementHeaderLayoutService } from './compliace_management_header.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FusePipesModule,
    FuseSharedModule,
    FuseSidebarModule,
    ComplianceAdminRoutingModule,
    LayoutModule,
    zhealthcareComplianceTabNavBarModule,
  ],
  exports: [ComplianceAdminComponent],
  declarations: [
    ComplianceAdminComponent,
    ComplianceManagementSummaryComponent,
    ComplianceReviewComponent,
    ComplianceNotificationComponent,
    EvaluationReviewComponent
  ],
  providers: [ComplianceManagementHeaderLayoutService],
})
export class ComplianceAdminModule {}
