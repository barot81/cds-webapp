import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentLevelScrollExampleComponent } from './examples/component-level-scroll-example/component-level-scroll-example.component';
import { PageLevelScrollExampleComponent } from './examples/page-level-scroll-example/page-level-scroll-example.component';

const routes: Routes = [
  {
    path: 'scroll-spy-page-level-scroll',
    component: PageLevelScrollExampleComponent
  },
  {
    path: 'scroll-spy-component-level-scroll',
    component: ComponentLevelScrollExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrollSpyDemoRoutingModule { }
