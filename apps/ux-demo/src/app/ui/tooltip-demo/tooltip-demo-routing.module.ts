import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TooltipExampleFourComponent } from './examples/tooltip-example-four/tooltip-example-four.component';
import { TooltipExampleOneComponent } from './examples/tooltip-example-one/tooltip-example-one.component';
import { TooltipExampleThreeComponent } from './examples/tooltip-example-three/tooltip-example-three.component';
import { TooltipExampleTwoComponent } from './examples/tooltip-example-two/tooltip-example-two.component';
import { TooltipDemoComponent } from './tooltip-demo/tooltip-demo.component';

const routes: Routes = [
  {
    path: 'tooltip-demo',
    component: TooltipDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'tooltip-example-one',
        pathMatch: 'full'
      },
      {
        path: 'tooltip-example-one',
        component: TooltipExampleOneComponent
      },
      {
        path: 'tooltip-example-two',
        component: TooltipExampleTwoComponent
      },
      {
        path: 'tooltip-example-three',
        component: TooltipExampleThreeComponent
      },
      {
        path: 'tooltip-example-four',
        component: TooltipExampleFourComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TooltipDemoRoutingModule { }
