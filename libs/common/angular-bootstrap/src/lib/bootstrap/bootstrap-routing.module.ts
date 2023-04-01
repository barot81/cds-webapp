import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BOOTSTRAP_DEFINITIONS } from '@zhealthcare-core/angular-mf';

import { ZhealthcareAngularBootstrapComponent } from './bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: ZhealthcareAngularBootstrapComponent,
    children: BOOTSTRAP_DEFINITIONS,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZhealthcareAngularBootstrapRoutingModule {}
