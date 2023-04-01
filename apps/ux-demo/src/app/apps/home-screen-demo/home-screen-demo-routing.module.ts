import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeScreenContainerComponent } from "./container/home-screen-container.component";

const routes: Routes = [{
    path: '',
    component: HomeScreenContainerComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeScreenRoutingModule { }