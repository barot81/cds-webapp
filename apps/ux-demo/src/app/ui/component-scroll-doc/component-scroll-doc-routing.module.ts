import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentScrollDocComponent } from './page/component-scroll-doc.component';

const routes: Routes = [
    {
        path: 'component-scroll-doc',
        component: ComponentScrollDocComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentScrollDocRoutingModule { }
