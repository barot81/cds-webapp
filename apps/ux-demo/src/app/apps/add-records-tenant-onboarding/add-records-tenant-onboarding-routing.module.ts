import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecordsTenantOnboardingComponent } from './add-records-tenant-onboarding.component';

const routes: Routes = [
  {
    path: 'add-records',
    component: AddRecordsTenantOnboardingComponent,
    children: [
      {
        path: '',
        redirectTo: 'add-records',
        pathMatch: 'full'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRecordsTenantOnboardingRoutingModule { }

