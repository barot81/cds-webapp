import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExxatUxRepoComponent } from './exxat-ux-repo/exxat-ux-repo.component';

const routes: Routes = [
  {
    path: 'exxat-component-library',
    component: ExxatUxRepoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExxatUxRepoRoutingModule {}
