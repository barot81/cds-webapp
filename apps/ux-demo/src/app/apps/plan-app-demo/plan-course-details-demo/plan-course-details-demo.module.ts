import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanCourseDetailsDemoRoutingModule } from './plan-course-details-demo-routing.module';
import { PlanCourseDetailsDemoComponent } from './plan-course-details-demo.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule, ExxatAvatarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';

@NgModule({
  declarations: [PlanCourseDetailsDemoComponent],
  imports: [
    CommonModule,
    PlanCourseDetailsDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    ExxatAvatarModule,
    ExxatTagModule
  ],
  providers: [
    PlanAppDemoDrawerService
  ]
})
export class PlanCourseDetailsDemoModule { }
