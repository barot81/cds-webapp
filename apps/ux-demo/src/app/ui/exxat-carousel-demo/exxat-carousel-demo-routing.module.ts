import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExxatCarouselDemoContainerComponent } from "./container/exxat-carousel-demo-container.component";

const routes: Routes = [
    {
        path: 'exxat-carousel-demo',
        component: ExxatCarouselDemoContainerComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExxatCarouselDemoRoutingModule { }