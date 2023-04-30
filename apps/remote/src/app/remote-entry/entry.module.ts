import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { PatientsGridComponent } from '../patients/patients-grid.component';
import { FilterDrawerComponent } from '../patients/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../patients/show-more-filter-drawer/show-more-filter-drawer.component';
import { FileUploadModule, FlexTableModule, FuseDirectivesModule, FuseSharedModule, FuseSidebarModule, FuseThemeOptionsModule, LayoutModule, MaterialModule, ShowMoreModule } from '@zhealthcare/ux';
import { FilterAndEditDrawerComponent } from '../patients/filter-and-edit-drawer/filter-and-edit-drawer.component';
import { EditColumnsComponent } from '../patients/edit-columns/edit-columns.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomDirectiveModule, RBACDirectiveModule } from '@zhealthcare/fusion/directives';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { PatientFormsModule } from '../forms/patient-forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from '../services/patient.service';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PatientHeaderComponent } from '../patient-details/patient-header/patient-header.component';
import { GeneralCommentsComponent } from '../patient-details/general-comments/general-comments.component';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    PatientsGridComponent,
    PatientDetailsComponent,
    EditColumnsComponent,
    FilterAndEditDrawerComponent,
    FilterDrawerComponent,
    ShowMoreFilterDrawerComponent,
    PatientHeaderComponent,
    GeneralCommentsComponent
],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    FuseSharedModule,
    FuseDirectivesModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    FlexLayoutModule,
    FlexTableModule,
    CustomDirectiveModule,
    RBACDirectiveModule,
    FileUploadModule,
    StoreModule,
    ShowMoreModule,
    DataSourceModule,
    PatientFormsModule,
    FeatureMetaDataPipesModule,
    DragDropModule,
    EffectsModule.forFeature([]),
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: 'patients',
            component: PatientsGridComponent
          },
          {
            path: 'patients/:id/details',
            component: PatientDetailsComponent
          },
          {
            path: '',
            redirectTo:'patients',
            pathMatch:'full'
          }
        ]
      }
    ]),
  ],
  providers: [DatePipe, PatientService]
})
export class RemoteEntryModule {
}
