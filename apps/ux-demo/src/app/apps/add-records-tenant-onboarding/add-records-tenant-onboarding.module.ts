import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecordsTenantOnboardingRoutingModule } from './add-records-tenant-onboarding-routing.module';
import { AddRecordsTenantOnboardingComponent } from './add-records-tenant-onboarding.component';
import { FlexTableModule, FuseModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { AddRecordsDrawerDemoComponent } from './add-records-drawer-demo/add-records-drawer-demo.component';
import { AddRecordTenantGridComponent } from './add-records-tenant-grid/add-records-tenant-grid.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';

@NgModule({
  declarations: [AddRecordsTenantOnboardingComponent, AddRecordsDrawerDemoComponent, AddRecordTenantGridComponent],
  imports: [
    CommonModule,
    AddRecordsTenantOnboardingRoutingModule,
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
export class AddRecordsTenantOnboardingModule { }
