import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanStudentDemoRoutingModule } from './plan-student-demo-routing.module';
import { PlanStudentDemoPlanComponent } from './plan-student-demo.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule, zhealthcareAvatarModule, FlexTableModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';
import { PlanStudentProfileDemoComponent } from './plan-student-profile-demo/plan-student-profile-demo.component';

@NgModule({
  declarations: [PlanStudentDemoPlanComponent, PlanStudentProfileDemoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    zhealthcareAvatarModule,
    zhealthcareTagModule,
    FlexTableModule,
    PlanStudentDemoRoutingModule
  ],
  providers: [
    PlanAppDemoDrawerService
  ]
})
export class PlanStudentDemoModule { }
