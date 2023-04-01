import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantOnboardingDemoRoutingModule } from './tenant-onboarding-demo-routing.module';
import { TenantOnboardingDemoComponent } from './tenant-onboarding-demo.component';
import { FlexTableModule, FuseModule, FuseSharedModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MatSortModule } from '@angular/material/sort';
import { AddInstitutionDrawerComponent } from './add-institution-drawer/add-institution-drawer.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { TenantOnboardingEditColumnsComponent } from './tenant-onboarding-edit-columns/tenant-onboarding-edit-columns.component';


@NgModule({
  declarations: [TenantOnboardingDemoComponent, AddInstitutionDrawerComponent, TenantOnboardingEditColumnsComponent],
  imports: [
    CommonModule,
    TenantOnboardingDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseModule,
    FlexTableModule,
    DataSourceModule,
    MatSortModule,
    FileUploadModule
  ]
})
export class TenantOnboardingDemoModule { }
