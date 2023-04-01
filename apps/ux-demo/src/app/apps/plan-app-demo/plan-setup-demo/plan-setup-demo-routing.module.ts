import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanSetupDemoContainerComponent } from './plan-setup-demo-container/plan-setup-demo-container.component';
import { CourseMeasuresComponent } from './course-measures/course-measures.component';
import { CurriculumAttributesComponent } from './curriculum-attributes/curriculum-attributes.component';
import { AssignAttributeComponent } from './assign-attribute/assign-attribute.component';

const routes: Routes = [
  {
    path: '',
    component: PlanSetupDemoContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'course-measures',
        pathMatch: 'full'
      },
      {
        path: 'course-measures',
        component: CourseMeasuresComponent
      },
      {
        path: 'curriculum-attributes',
        component: CurriculumAttributesComponent
      },
      {
        path: 'assign-attribute',
        component: AssignAttributeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanSetupDemoRoutingModule { }
