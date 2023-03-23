import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BOOTSTRAP_DEFINITIONS } from '@exxat-core/angular-mf';

import { ExxatAngularBootstrapComponent } from './bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: ExxatAngularBootstrapComponent,
    children: BOOTSTRAP_DEFINITIONS,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExxatAngularBootstrapRoutingModule {}
