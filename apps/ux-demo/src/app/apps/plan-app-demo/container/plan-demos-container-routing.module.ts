import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlanDemosContainerComponent } from "./plan-demos-container.component";

export const routes: Routes = [
    {
        path: '',
        component: PlanDemosContainerComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanDemosContainerRoutingModule { }