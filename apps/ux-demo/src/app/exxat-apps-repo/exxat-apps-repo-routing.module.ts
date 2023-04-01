import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExxatAppsRepoComponent } from './exxat-apps-repo/exxat-apps-repo.component';

const routes: Routes = [
  {
    path: 'exxat-apps-repo',
    component: ExxatAppsRepoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExxatAppsRepoRoutingModule { }
