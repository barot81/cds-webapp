import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'component-scroll-layout',
        children: [
            {
                path: '',
                redirectTo: 'left-side-bar',
                pathMatch: 'full'
            },
            {
                path: 'left-side-bar',
                loadChildren: () => import('./pages/left-sidebar').then(mod => mod.LeftSidebarModule)
            },
            {
                path: 'masonry-layout',
                loadChildren: () => import('./pages/masonry-layout').then(mod => mod.MasonryLayoutModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentScrollLayoutRoutingModule { }