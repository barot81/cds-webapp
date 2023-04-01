import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { zhealthcareGraphsStandardContainerComponent } from "./container/zhealthcare-graphs-containter.component";


const routes: Routes = [
    {
        path: 'zhealthcare_graphs_standards',
        component: zhealthcareGraphsStandardContainerComponent,
    },
    {
        path: 'zhealthcare_graphs_standards/pages',
        loadChildren: () => import('./pages').then(mod => mod.PagesModule)
    },
    {
        path: 'zhealthcare_graphs_standards/layouts',
        loadChildren: () => import('./layouts').then(mod => mod.LayoutsModule)
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class zhealthcareGraphsStandardRoutingModule {

}