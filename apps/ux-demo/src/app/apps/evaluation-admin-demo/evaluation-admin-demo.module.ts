import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationAdminDemoRoutingModule } from './evaluation-admin-demo-routing.module';
import { EvaluationAdminDemoComponent } from './evaluation-admin-demo.component';
import { EvaluationAdminReviewComponent } from './tabs/evaluation-admin-review/evaluation-admin-review.component';
import { EvaluationAdminDemoNavBarComponent } from './evaluation-admin-demo-nav-bar/evaluation-admin-demo-nav-bar.component';
import { MaterialModule, FuseSidebarModule, FuseSharedModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [EvaluationAdminDemoComponent, EvaluationAdminReviewComponent, EvaluationAdminDemoNavBarComponent],
  imports: [
    CommonModule,
    EvaluationAdminDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSidebarModule,
    FuseSharedModule
  ]
})
export class EvaluationAdminDemoModule { }
