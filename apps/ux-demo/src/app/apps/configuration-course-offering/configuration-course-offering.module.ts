import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatAvatarModule, ExxatBreadcrumbModule, ExxatCarouselModule, ExxatTooltipModule, FlexTableModule, FuseModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { ConfigurationCourseOfferingRoutingModule } from './configuration-course-offering-routing.module';
import { ConfigurationCourseOfferingComponent } from './configuration-course-offering.component';
import { AddFormDrawerComponent } from './add-form-drawer/add-form-drawer.component';
import { FileUploadModule } from '@exxat/plugin/file-upload';

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
    ExxatBreadcrumbModule,
    ExxatAvatarModule,
    ExxatCarouselModule,
    ExxatTooltipModule
  ]
})
export class ConfigurationCourseOfferingModule { }
