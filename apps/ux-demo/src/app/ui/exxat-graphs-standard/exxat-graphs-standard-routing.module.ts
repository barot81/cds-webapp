import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExxatGraphsStandardContainerComponent } from "./container/exxat-graphs-containter.component";


const routes: Routes = [
    {
        path: 'exxat_graphs_standards',
        component: ExxatGraphsStandardContainerComponent,
    },
    {
        path: 'exxat_graphs_standards/pages',
        loadChildren: () => import('./pages').then(mod => mod.PagesModule)
    },
    {
        path: 'exxat_graphs_standards/layouts',
        loadChildren: () => import('./layouts').then(mod => mod.LayoutsModule)
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExxatGraphsStandardRoutingModule {

}