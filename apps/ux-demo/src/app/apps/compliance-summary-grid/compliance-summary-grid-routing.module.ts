import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComplianceSummaryGridComponent } from "./page/compliance-summary-grid.component";

const routes: Routes = [
    {
        path: '',
        component: ComplianceSummaryGridComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComplianceSummaryGridRoutingModule { }