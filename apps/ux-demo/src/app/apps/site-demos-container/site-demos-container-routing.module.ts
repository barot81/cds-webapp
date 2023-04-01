import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SiteDemosContainerComponent } from "./site-demos-container.component";

const routes: Routes = [
    {
        path: '',
        component: SiteDemosContainerComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteDemosContainerRoutingModule { }