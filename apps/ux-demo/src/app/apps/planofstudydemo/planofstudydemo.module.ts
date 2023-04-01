import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanofstudydemoRoutingModule } from './planofstudydemo-routing.module';
import { PlanOfStudyComponent } from './plan-of-study.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PlanOfStudyComponent],
  imports: [
    CommonModule,
    PlanofstudydemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class PlanofstudydemoModule { }
