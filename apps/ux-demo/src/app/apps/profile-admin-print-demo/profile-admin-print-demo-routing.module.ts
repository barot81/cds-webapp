import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "@exxat/fusion/core";
import { ProfileAdminContainerComponent } from "./container/profiel-admin-container.component";
import { AcademicInfoComponent } from "./pages";

const routes: Routes = [{
    path: '',
    component: ProfileAdminContainerComponent,
    canActivate: [AuthGuardService],
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'academic-info'
        },
        {
            path: 'academic-info',
            component: AcademicInfoComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileAdminPrintDemoRoutingModule { }