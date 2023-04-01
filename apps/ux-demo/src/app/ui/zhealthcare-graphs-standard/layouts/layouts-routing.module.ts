import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutsContainerComponent } from "./container/layouts-container.component";
import { LayoutOneComponent, LayoutThreeComponent, LayoutTwoComponent } from "./layouts";


const routes: Routes = [
    {
        path: '',
        component: LayoutsContainerComponent,
        children: [
            {
                path: '',
                redirectTo: 'layout_one',
                pathMatch: 'full',
            },

            {
                path: 'layout_one',
                component: LayoutOneComponent
            },
            {
                path: 'layout_two',
                component: LayoutTwoComponent
            },
            {
                path: 'layout_three',
                component: LayoutThreeComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule {

}