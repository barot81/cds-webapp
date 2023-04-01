import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutOneContainerComponent } from './container/layout-one-container.component';
import { TabFourComponent, TabOneComponent, TabThreeComponent, TabTwoComponent, TabFiveComponent, TabSixComponent } from './tabs';

const routes: Routes = [
    {
        path: '',
        component: LayoutOneContainerComponent,
        children: [
            {
                path: '',
                redirectTo: 'tab-one',
                pathMatch: 'full'
            },
            {
                path: 'tab-one',
                component: TabOneComponent
            },
            {
                path: 'tab-two',
                component: TabTwoComponent
            },
            {
                path: 'tab-three',
                component: TabThreeComponent
            },
            {
                path: 'tab-four',
                component: TabFourComponent
            },
            {
                path: 'tab-five',
                component: TabFiveComponent
            },
            {
                path: 'tab-six',
                component: TabSixComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutOneRoutingModule { }