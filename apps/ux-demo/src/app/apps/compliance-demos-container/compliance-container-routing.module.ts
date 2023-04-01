import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ComplianceDemoContainerComponent } from './compliance-container.component';

const routes: Routes = [
    {
        path: '',
        component: ComplianceDemoContainerComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComplinaceDemoContainerRoutingModule { }