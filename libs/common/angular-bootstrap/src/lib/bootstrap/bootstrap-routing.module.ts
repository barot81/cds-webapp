import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BOOTSTRAP_DEFINITIONS } from '@zhealthcare-core/angular-mf';

import { zhealthcareAngularBootstrapComponent } from './bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: zhealthcareAngularBootstrapComponent,
    children: BOOTSTRAP_DEFINITIONS,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class zhealthcareAngularBootstrapRoutingModule {}
