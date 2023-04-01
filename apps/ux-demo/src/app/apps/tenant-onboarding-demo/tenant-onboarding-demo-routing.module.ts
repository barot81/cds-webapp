import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantOnboardingDemoComponent } from './tenant-onboarding-demo.component';

const routes: Routes = [
  {
    path: 'tenant-onboarding-demo',
    component: TenantOnboardingDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'tenant-onboarding-demo',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantOnboardingDemoRoutingModule { }
