import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareAvatarModule, zhealthcareBreadcrumbModule, zhealthcareCarouselModule, zhealthcareTooltipModule, FlexTableModule, FuseModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { ConfigurationCourseOfferingRoutingModule } from './configuration-course-offering-routing.module';
import { ConfigurationCourseOfferingComponent } from './configuration-course-offering.component';
import { AddFormDrawerComponent } from './add-form-drawer/add-form-drawer.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';

@NgModule({
  declarations: [ConfigurationCourseOfferingComponent, AddFormDrawerComponent],
  imports: [
    CommonModule,
    ConfigurationCourseOfferingRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FlexTableModule,
    DataSourceModule,
    MatSortModule,
    FuseSidebarModule,
    FuseModule,
    FileUploadModule,
    zhealthcareBreadcrumbModule,
    zhealthcareAvatarModule,
    zhealthcareCarouselModule,
    zhealthcareTooltipModule
  ]
})
export class ConfigurationCourseOfferingModule { }
