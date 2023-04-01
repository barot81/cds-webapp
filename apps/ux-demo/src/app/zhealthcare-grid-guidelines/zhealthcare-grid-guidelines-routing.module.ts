import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { zhealthcareGrdiGuidelinesContainerComponent } from "./container/zhealthcare-grid-guidelines-container.component";

const routes: Routes = [
    {
        path: 'zhealthcare-grid-guidelines',
        component: zhealthcareGrdiGuidelinesContainerComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class zhealthcareGridGuidelinesRoutingModule {}