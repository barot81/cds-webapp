import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UxProcessComponent } from './ux-process/ux-process.component';

const routes: Routes = [
  {
    path: 'ux-process',
    component: UxProcessComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UxProcessRoutingModule { }
