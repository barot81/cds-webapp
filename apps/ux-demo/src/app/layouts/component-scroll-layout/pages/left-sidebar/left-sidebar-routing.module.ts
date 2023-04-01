import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'layout-one',
        pathMatch: 'full'
    },
    {
        path: 'layout-one',
        loadChildren: () => import('./layout-one').then(mod => mod.LayoutOneModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeftSidebarRoutingModule { }