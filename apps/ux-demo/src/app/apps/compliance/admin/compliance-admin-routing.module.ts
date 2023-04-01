import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@exxat/fusion/core';
import { ComplianceAdminComponent } from './compliance-admin/compliance-admin.component';
import { ComplianceManagementSummaryComponent } from './compliance-management-summary/compliance-management-summary.component';
import { ComplianceReviewComponent } from './compliance-review/compliance-review.component';
import { ComplianceNotificationComponent } from './compliance-notification/compliance-notification.component';
import { EvaluationReviewComponent } from './evaluation-review/evaluation-review.component';

const routes: Routes = [
    {
        path: '',
        component: ComplianceAdminComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'full'
            },
            {
                path: 'summary',
                component: ComplianceManagementSummaryComponent
            },
            {
                path: 'review',
                component: ComplianceReviewComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'notifications',
                component: ComplianceNotificationComponent,
                canActivate: [AuthGuardService]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ComplianceAdminRoutingModule { }
