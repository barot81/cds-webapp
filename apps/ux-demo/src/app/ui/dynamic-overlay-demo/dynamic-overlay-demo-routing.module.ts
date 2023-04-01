import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentPassingExampleComponent } from './containers';

const routes: Routes = [
  {
    path: 'dynamic-overlay',
    component: ComponentPassingExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicOverlayDemoRoutingModule {}
