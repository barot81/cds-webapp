import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareAppsRepoComponent } from './zhealthcare-apps-repo/zhealthcare-apps-repo.component';

const routes: Routes = [
  {
    path: 'zhealthcare-apps-repo',
    component: zhealthcareAppsRepoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class zhealthcareAppsRepoRoutingModule { }
