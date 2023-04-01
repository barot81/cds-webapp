import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatAvatarModule, ExxatBreadcrumbModule, ExxatCarouselModule, FlexTableModule, FuseModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { FileUploadModule } from '@exxat/plugin/file-upload';
import { FacultyProfilePageRoutingModule } from './faculty-profile-page-routing.modue';
import { FacultyProfilePageComponent } from './faculty-profile-page.component';

@NgModule({
  declarations: [FacultyProfilePageComponent],
  imports: [
    CommonModule,
    FacultyProfilePageRoutingModule,
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
    ExxatCarouselModule
  ]
})
export class FacultyProfilePageModule { }
