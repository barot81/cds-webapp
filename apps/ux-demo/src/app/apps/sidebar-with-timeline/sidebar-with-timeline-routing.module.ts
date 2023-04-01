import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarWithTimelineComponent } from './sidebar-with-timeline.component';

const routes: Routes = [
  {
    path: 'sidebar-with-timeline',
    component: SidebarWithTimelineComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarWithTimelineRoutingModule { }
