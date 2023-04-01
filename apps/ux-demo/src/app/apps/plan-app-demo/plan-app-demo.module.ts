import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanAppDemoRoutingModule } from './plan-app-demo-routing.module';
import {
  FuseSharedModule,
  MaterialModule,
  FuseSidebarModule,
  LayoutModule,
  zhealthcareTimePickerModule,
  NgxMaterialTimepickerModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlanDemoAppContainerComponent } from './plan-demo-app-container/plan-demo-app-container.component';
import { AddCourseOfferingComponent } from './drawers/add-course-offering/add-course-offering.component';
import { PlanAppDemoDrawerService } from './plan-app-demo-drawer.service';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { UIzhealthcareDrawersModule } from '../../ui/zhealthcare-drawers/zhealthcare-drawers.module';
import { CourseCatalogDemoComponent } from './course-catalog-demo/course-catalog-demo.component';
import { AddCourseMeasuresComponent } from './drawers/add-course-measures/add-course-measures.component';
import { EditCourseMeasureComponent } from './drawers/edit-course-measure/edit-course-measure.component';
import { AddCourseCurriculumComponent } from './drawers/add-course-curriculum/add-course-curriculum.component';
import { PlanCourseDetailsDemoModule } from './plan-course-details-demo/plan-course-details-demo.module';
import { AddCourseDetailsComponent } from './drawers/add-course-details/add-course-details.component';
import { PlanStaticDemoPagesModule } from './plan-static-demo-pages/plan-static-demo-pages.module';
import { AddEventScheduleDrawerComponent } from './drawers/add-event-schedule-drawer/add-event-schedule-drawer.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { AddResourcesDrawerComponent } from './drawers/add-resources-drawer/add-resources-drawer.component';

import { PlanStudentBasicInfoDrawerComponent } from './drawers/plan-student-basic-info-drawer/plan-student-basic-info-drawer.component';
import { PlanStudentDemoModule } from './plan-student-demo/plan-student-demo.module';
import { AddressInfoDrawerComponent } from './drawers/address-info-drawer/address-info-drawer.component';
import { LicensureInfoDrawerComponent } from './drawers/licensure-info-drawer/licensure-info-drawer.component';
import { CertificationInfoDrawerComponent } from './drawers/certification-info-drawer/certification-info-drawer.component';
import { GeneralEmployementDetailsDrawerComponent } from './drawers/general-employement-details-drawer/general-employement-details-drawer.component';
import { ObjectiveDrawerDemoComponent } from './drawers/objective-drawer-demo/objective-drawer-demo.component';
import { ReorderTreeDrawerComponent } from './drawers/reorder-tree-drawer/reorder-tree-drawer.component';
import { FileDatabase } from '../../ui/zhealthcare-ui-components/tabs/zhealthcare-tree-demo/variations/tree-variation-six/file-database.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddCAPTEDetailsDrawerComponent } from './drawers/add-capte-details-drawer/add-capte-details-drawer.component';
import { AddCAPTEDetailsDrawerTwoComponent } from './drawers/add-capte-details-drawer-two/add-capte-details-drawer-two.component';
import { AddMappingDrawerComponent } from './drawers/add-mapping-drawer/add-mapping-drawer.component';

@NgModule({
  declarations: [
    PlanDemoAppContainerComponent,
    AddCourseOfferingComponent,
    CourseCatalogDemoComponent,
    AddCourseMeasuresComponent,
    AddCourseDetailsComponent,
    EditCourseMeasureComponent,
    AddCourseCurriculumComponent,
    AddEventScheduleDrawerComponent,
    AddResourcesDrawerComponent,
    PlanStudentBasicInfoDrawerComponent,
    AddressInfoDrawerComponent,
    LicensureInfoDrawerComponent,
    CertificationInfoDrawerComponent,
    GeneralEmployementDetailsDrawerComponent,
    ObjectiveDrawerDemoComponent,
    ReorderTreeDrawerComponent,
    AddCAPTEDetailsDrawerComponent,
    AddCAPTEDetailsDrawerTwoComponent,
    AddMappingDrawerComponent,
  ],
  imports: [
    CommonModule,
    PlanAppDemoRoutingModule,
    FuseSharedModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSidebarModule,
    FuseHighlightModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    UIzhealthcareDrawersModule,
    PlanCourseDetailsDemoModule,
    PlanStaticDemoPagesModule,
    zhealthcareTimePickerModule,
    NgxMaterialTimepickerModule,
    FileUploadModule,
    PlanStudentDemoModule,
    DragDropModule,
  ],
  providers: [PlanAppDemoDrawerService, FileDatabase],
})
export class PlanAppDemoModule {}
