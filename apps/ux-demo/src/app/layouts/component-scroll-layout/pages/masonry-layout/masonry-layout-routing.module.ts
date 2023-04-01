import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasonryLayoutComponent } from './masonry-layout/masonry-layout.component';

const routes: Routes = [
    {
        path: '',
        component: MasonryLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasonryLayoutRoutingModule { }