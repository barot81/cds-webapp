import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "@exxat/fusion/core";
import { ErrorDemoComponent } from "./container/error-demo.component";

const routes: Routes = [{
    path: '',
    component: ErrorDemoComponent,
    canActivate: [AuthGuardService]
},
{
    path: 'error-demo-404',
    loadChildren: () => import('./pages/error-demo-404/error-demo-404.module').then(mod => mod.ErrorDemo404Module),
    canActivate: [AuthGuardService]
},
{
    path: 'error-demo-500',
    loadChildren: () => import('./pages/error-demo-500/error-demo-500.module').then(mod => mod.ErrorDemo500Module),
    canActivate: [AuthGuardService]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorDemoRoutingModule {

}