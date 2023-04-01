import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@zhealthcare/plugin/ckeditor';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import {
  zhealthcareAvatarModule,
  zhealthcareBreadcrumbModule,
  zhealthcareCarouselModule,
  zhealthcareTooltipModule,
  FlexTableModule,
  FuseModule,
  FuseSharedModule,
  FuseSidebarModule,
  LayoutModule,
  MaterialModule,
  NgxMaterialTimepickerModule,
} from '@zhealthcare/ux';
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
    zhealthcareBreadcrumbModule,
    zhealthcareAvatarModule,
    zhealthcareCarouselModule,
    zhealthcareTooltipModule,
    MatStepperModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
  ],
})
export class EssWizardPageNewModule {}
