import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExxatGrdiGuidelinesContainerComponent } from "./container/exxat-grid-guidelines-container.component";

const routes: Routes = [
    {
        path: 'exxat-grid-guidelines',
        component: ExxatGrdiGuidelinesContainerComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExxatGridGuidelinesRoutingModule {}