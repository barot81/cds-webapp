import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { zhealthcareCarouselDemoContainerComponent } from "./container/zhealthcare-carousel-demo-container.component";

const routes: Routes = [
    {
        path: 'zhealthcare-carousel-demo',
        component: zhealthcareCarouselDemoContainerComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class zhealthcareCarouselDemoRoutingModule { }