import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionListDemoRoutingModule } from './institution-list-demo-routing.module';
import { InstitutionListDemoComponent } from './institution-list-demo.component';
import { FlexTableModule, FuseModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { EditInstitutionDetailsDrawerComponent } from './edit-institution-details-drawer/edit-institution-details-drawer.component';
import { FileUploadModule } from '@exxat/plugin/file-upload';
import { AddDepartmentDetailsDrawerComponent } from './add-department-details-drawer/add-department-details-drawer.component';


@NgModule({
  declarations: [InstitutionListDemoComponent, EditInstitutionDetailsDrawerComponent, AddDepartmentDetailsDrawerComponent],
  imports: [
    CommonModule,
    InstitutionListDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FlexTableModule,
    DataSourceModule,
    MatSortModule,
    FuseSidebarModule,
    FuseModule,
    FileUploadModule
  ]
})
export class InstitutionListDemoModule { }
