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
// import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
// import { ProfileGridFiltersComponent } from './filters/grid-filters/grid-filters.component';
import { StudentLandingGridFilterComponent } from './filters/student-landing-grid-filter/student-landing-grid-filter.component';
// import { AddStudentComponent } from './add-student/add-student.component';
import { ProfileShareHistoryComponent } from './share-profile/profile-share-history/profile-share-history.component';
// import { ShareCompletedPlacementsComponent } from './share-profile/share-completed-placements/share-completed-placements.component';
// import { ShareComplianceDocumentsComponent } from './share-profile/share-compliance-documents/share-compliance-documents.component';
import { ChecklistDatabase } from './share-profile/share-selected-compliance-docs.service';
// import { ShareWithSiteFailurePopupComponent } from './share-profile/share-with-site/share-with-site-failure-popup/share-with-site-failure-popup.component';
// import { StudentShowMoreComponent } from './filters/show-more/show-more.component';
// import { MatListModule } from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card';
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
   // AddStudentComponent,
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
