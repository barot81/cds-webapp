import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@zhealthcare/fusion/core';
import { ProgramsDashboardComponent } from './programs-dashboard.component';
import { ProgramsDemoComponent } from './pages/programs-demo/programs-demo.component';

const routes: Routes = [
    {
        path: '',
        component: ProgramsDashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'programs',
                pathMatch: 'full'
            },
            {
                path: 'programs',
                component: ProgramsDemoComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ProgramsDashboardRoutingModule { }
