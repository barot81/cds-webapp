import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PdPatientGridComponent } from './pd-patients-grid/pd-patient-grid.component';

const routes: Routes = [
  {
    path: '',
    component: PdPatientGridComponent,
  },
  {
    path: ':id/details',
    component: PatientDetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdPatientsRoutingModule { }
