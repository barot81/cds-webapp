import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataLevelSecurityDemoContainerComponent } from './container';
import { DataLevelSecurityComponent } from "./pages";

const routes: Routes = [
    {
        path: '',
        component: DataLevelSecurityDemoContainerComponent,
        children: [
            {
                path: '',
                component: DataLevelSecurityComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataLevelSecurityDemoRoutingModule {

}