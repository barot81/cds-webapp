import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationCourseOfferingComponent } from './configuration-course-offering.component';

const routes: Routes = [
  {
    path: 'configuration-course-offering',
    component: ConfigurationCourseOfferingComponent,
    children: [
      {
        path: '',
        redirectTo: 'configuration-course-offering',
        pathMatch: 'full'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationCourseOfferingRoutingModule { }

