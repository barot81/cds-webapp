import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdPatientDetailsComponent } from '../pd-patient-details/pd-patient-details.component';
import { PdPatientGridComponent } from './pd-patients-grid/pd-patient-grid.component';

const routes: Routes = [
  {
    path: '',
    component: PdPatientGridComponent,
  },
  {
    path: ':id/details',
    component: PdPatientDetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdPatientsRoutingModule { }
