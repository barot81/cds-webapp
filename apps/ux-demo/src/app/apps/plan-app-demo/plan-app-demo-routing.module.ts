import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanDemoAppContainerComponent } from './plan-demo-app-container/plan-demo-app-container.component';
import { CourseCatalogDemoComponent } from './course-catalog-demo/course-catalog-demo.component';

const routes: Routes = [
  {
    path: 'plan-app-demo',
    component: PlanDemoAppContainerComponent
  },
  {
    path: 'course-catalog-demo',
    component: CourseCatalogDemoComponent
  },
  {
    path: 'plan-setup-demo',
    loadChildren: () => import('./plan-setup-demo/plan-setup-demo.module').then(mod => mod.PlanSetupDemoModule)
  },
  {
    path: 'plan-mapping-demo',
    loadChildren: () => import('./plan-mapping-demo/plan-mapping-demo.module').then(mod => mod.PlanMappingDemoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAppDemoRoutingModule { }
