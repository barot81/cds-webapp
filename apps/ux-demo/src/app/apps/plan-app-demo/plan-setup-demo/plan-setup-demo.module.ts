import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanSetupDemoRoutingModule } from './plan-setup-demo-routing.module';
import { PlanSetupDemoContainerComponent } from './plan-setup-demo-container/plan-setup-demo-container.component';
import { CourseMeasuresComponent } from './course-measures/course-measures.component';
import { CurriculumAttributesComponent } from './curriculum-attributes/curriculum-attributes.component';
import { AssignAttributeComponent } from './assign-attribute/assign-attribute.component';
import { MaterialModule, FuseSharedModule, FuseSidebarModule, zhealthcareTreeModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlanSetupDemoContainerComponent,
    CourseMeasuresComponent,
    CurriculumAttributesComponent,
    AssignAttributeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    FlexLayoutModule,
    FuseSidebarModule,
    PlanSetupDemoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    zhealthcareTreeModule
  ],
  providers: [
    PlanAppDemoDrawerService
  ]
})
export class PlanSetupDemoModule { }
