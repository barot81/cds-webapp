import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InfoBoxesComponent } from "./pages/info-boxes.component";

const routes: Routes = [
    {
        path: 'info-boxes',
        component: InfoBoxesComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoBoxesRoutingModule { }