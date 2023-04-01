import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeftSidebarLayoutComponent } from './container/left-sidebar-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LeftSidebarLayoutComponent
    }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeftSidebarRoutingLayoutModule {

}