import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareUxRepoComponent } from './zhealthcare-ux-repo/zhealthcare-ux-repo.component';

const routes: Routes = [
  {
    path: 'zhealthcare-component-library',
    component: zhealthcareUxRepoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class zhealthcareUxRepoRoutingModule {}
