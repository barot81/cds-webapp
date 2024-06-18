import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdPatientsRoutingModule } from './pd-patients-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomDirectiveModule, RBACDirectiveModule } from '@zhealthcare/fusion/directives';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MaterialModule, FuseSharedModule, FuseSidebarModule, zhealthcareAvatarModule, ShowMoreModule } from '@zhealthcare/ux';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PatientFormsModule } from '../forms/patient-forms.module';
import { PdPatientGridComponent } from './pd-patients-grid/pd-patient-grid.component';
import { PatientsModule } from '../patients/patients.module';
import { PdPatientDashboardComponent } from './pd-patient-dashboard/pd-patient-dashboard.component';
import { AuditorFindingsComponent } from '../pd-patient-details/auditor-finding/auditor-findings.component';
import { PdPatientDetailsComponent } from '../pd-patient-details/pd-patient-details.component';


@NgModule({
  declarations: [
      PdPatientGridComponent,
      AuditorFindingsComponent,
      PdPatientDetailsComponent,
      PdPatientDashboardComponent
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
    PdPatientsRoutingModule,
    PatientsModule,
  ]
})
export class PdPatientsModule {
}
