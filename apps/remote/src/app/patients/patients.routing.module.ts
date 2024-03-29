import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PatientGridComponent } from './patients-grid/patient-grid.component';

const routes: Routes = [
  {
    path: '',
    component: PatientGridComponent,
  },
  {
    path: ':id/details',
    component: PatientDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
