import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesContainerComponent } from "./container/pages-container.component";
import { PageFiveComponent, PageFourComponent, PageOneComponent, PageSevenComponent, PageSixComponent, PageThreeComponent, PageTwoComponent } from "./pages";


const routes: Routes = [
    {
        path: '',
        component: PagesContainerComponent
    },
    {
        path: 'page_one',
        component: PageOneComponent
    },
    {
        path: 'page_two',
        component: PageTwoComponent
    },
    {
        path: 'page_three',
        component: PageThreeComponent
    },
    {
        path: 'page_four',
        component: PageFourComponent
    },
    {
        path: 'page_five',
        component: PageFiveComponent
    },
    {
        path: 'page_six',
        component: PageSixComponent
    },
    {
        path: 'page_seven',
        component: PageSevenComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {

}