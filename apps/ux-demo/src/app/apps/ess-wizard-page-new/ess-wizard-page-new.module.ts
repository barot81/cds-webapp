import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@exxat/plugin/ckeditor';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { FileUploadModule } from '@exxat/plugin/file-upload';
import {
  ExxatAvatarModule,
  ExxatBreadcrumbModule,
  ExxatCarouselModule,
  ExxatTooltipModule,
  FlexTableModule,
  FuseModule,
  FuseSharedModule,
  FuseSidebarModule,
  LayoutModule,
  MaterialModule,
  NgxMaterialTimepickerModule,
} from '@exxat/ux';
import { EssWizardPageNewComponentRoutingModule } from './ess-wizard-page-new-routing.module';
import { EssWizardPageNewComponent } from './ess-wizard-page-new.component';

@NgModule({
  declarations: [EssWizardPageNewComponent],
  imports: [
    CommonModule,
    EssWizardPageNewComponentRoutingModule,
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
    ExxatTooltipModule,
    MatStepperModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
  ],
})
export class EssWizardPageNewModule {}
