import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareAvatarModule, zhealthcareBreadcrumbModule, zhealthcareCarouselModule, FlexTableModule, FuseModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
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
    zhealthcareBreadcrumbModule,
    zhealthcareAvatarModule,
    zhealthcareCarouselModule
  ]
})
export class FacultyProfilePageModule { }
