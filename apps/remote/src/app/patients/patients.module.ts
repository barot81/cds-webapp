import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients.routing.module';
import { GeneralCommentsComponent } from '../patient-details/general-comments/general-comments.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PatientFindingsComponent } from '../patient-details/patient-finding/patient-findings.component';
import { PatientHeaderComponent } from '../patient-details/patient-header/patient-header.component';
import { FilterDrawerComponent } from './filter-drawer/filter-drawer.component';
import { PatientGridComponent } from './patients-grid/patient-grid.component';
import { ShowMoreFilterDrawerComponent } from './show-more-filter-drawer/show-more-filter-drawer.component';
import { PatientFormsModule } from '../forms/patient-forms.module';
import { PatientService } from '../services/patient.service';
import { FuseSharedModule, FuseSidebarModule, FuseThemeOptionsModule, MaterialModule, ShowMoreModule, zhealthcareAvatarModule } from '@zhealthcare/ux';
import { HttpClientModule } from '@angular/common/http';
import { CustomDirectiveModule, RBACDirectiveModule } from '@zhealthcare/fusion/directives';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { EffectsModule } from '@ngrx/effects';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    PatientDetailsComponent,
    FilterDrawerComponent,
    ShowMoreFilterDrawerComponent,
    PatientHeaderComponent,
    GeneralCommentsComponent,
    PatientFindingsComponent,
    PatientGridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FuseSharedModule,
    FuseSidebarModule,
    zhealthcareAvatarModule,
    PatientFormsModule,
    FeatureMetaDataPipesModule,
    DataSourceModule,
    CustomDirectiveModule,
    RBACDirectiveModule,
    ShowMoreModule,
    DataSourceModule,
    MatTableExporterModule,
    EffectsModule.forFeature([]),
    PatientsRoutingModule
  ],
  providers:[PatientService]
})
export class PatientsModule { }
