import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanStaticDemoPagesComponent } from './plan-static-demo-pages.component';
import { AuthGuardService } from '@exxat/fusion/core';
import { PlanCourseDetailsDemoComponent } from '../plan-course-details-demo/plan-course-details-demo.component';
import { EventScheduleDemoComponent } from './event-schedule-demo/event-schedule-demo.component';
import { ResourcesDemoComponent } from './resources-demo/resources-demo.component';
import { MeasuresDemoComponent } from './measures-demo/measures-demo.component';

const routes: Routes = [
  {
    path: '',
    component: PlanStaticDemoPagesComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'event-schedule-demo',
        pathMatch: 'full'
    },
    {
      path: 'measures-demo',
      component: MeasuresDemoComponent
  },
    {
        path: 'event-schedule-demo',
        component: EventScheduleDemoComponent
    },
    {
      path: 'resources-demo',
      component: ResourcesDemoComponent
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanStaticDemoPagesRoutingModule { }
