/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  zhealthcareTooltipModule, zhealthcare_DATE_FORMATS,
  FuseDirectivesModule, LayoutModule, MaterialModule,
  MonthYearPickerModule, UXStoreModule
} from '@zhealthcare/ux';

import { PatientFormsService } from './patient-forms.service';

import { FlexLayoutModule } from '@angular/flex-layout';
// import { ShareWithSiteComponent } from './share-profile/share-with-site/share-with-site.component';

import {
  CustomDirectiveModule,
  RBACDirectiveModule
} from '@zhealthcare/fusion/directives';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { TextMaskModule } from 'angular2-text-mask';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CKEditorModule } from '@zhealthcare/plugin/ckeditor';
import { NotificationWizardModule } from '@zhealthcare/plugin/notifications';
import { MarkdownModule } from 'ngx-markdown';
import { StudentLandingGridFilterComponent } from './filters/student-landing-grid-filter/student-landing-grid-filter.component';
import { ProfileShareHistoryComponent } from './share-profile/profile-share-history/profile-share-history.component';
import { ChecklistDatabase } from './share-profile/share-selected-compliance-docs.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UXStoreModule,
    FlexLayoutModule,
    MonthYearPickerModule,
    LayoutModule,
    FeatureMetaDataPipesModule,
    CustomDirectiveModule,
    RBACDirectiveModule,
    TextMaskModule,
    FileUploadModule,
    FuseDirectivesModule,
    MarkdownModule.forRoot(),
    FormsModule,
    NotificationWizardModule,
    CKEditorModule,
    zhealthcareTooltipModule,
  ],

  declarations: [
    // ShareWithSiteComponent,
    AddPatientComponent,
    StudentLandingGridFilterComponent,
    ProfileShareHistoryComponent,
   // ShareComplianceDocumentsComponent,
    // ShareWithSiteFailurePopupComponent,
   // ProfileGridFiltersComponent,
   // ShareCompletedPlacementsComponent,
    //BulkUpdateComponent,
    //StudentShowMoreComponent
  ],

  providers: [
    // ComponentRefreshService,
    // InterventionRefreshService,
    PatientFormsService,
    ChecklistDatabase,
    { provide: MAT_DATE_FORMATS, useValue: zhealthcare_DATE_FORMATS },
  ],
})
export class ProfileFormsModule {
  constructor() {}
}
