import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { VerticalStepperDemoContainerComponent } from './container';
import { ExampleOneComponent } from './pages';

const routes: Routes = [
    {
        path: 'vertical_stepper_demo',
        component: VerticalStepperDemoContainerComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'example_one'
            },
            {
                path: 'example_one',
                component: ExampleOneComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerticalStepperDemoRoutingModule { }
