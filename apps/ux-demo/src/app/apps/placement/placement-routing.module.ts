import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@exxat/fusion/core';
import { PlacementComponent } from './placement.component';
import { ManagePlacementsComponent } from './tabs/manage-placements/manage-placements.component';
import { PlacementDashboardComponent } from './tabs/placement-dashboard/placement-dashboard.component';
import { ConfigurationComponent } from './tabs/configuration/configuration.component';
import { ManageSlotsComponent } from './tabs/manage-slots/manage-slots.component';
import { WishlistsComponent } from './tabs/wishlists/wishlists.component';
import { NotificationComponent } from 'angular2-notifications';
import { NotoficationsComponent } from './tabs/notofications/notofications.component';

const routes: Routes = [
    {
        path: '',
        component: PlacementComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'manage-placements',
                pathMatch: 'full'
            },
            {
                path: 'manage-placements',
                component: ManagePlacementsComponent
            },
            {
                path: 'dashboard',
                component: PlacementDashboardComponent
            },
            {
                path: 'configuration',
                component: ConfigurationComponent
            },
            {
                path: 'manage-slots',
                component: ManageSlotsComponent
            },
            {
                path: 'wishlists',
                component: WishlistsComponent
            },
            {
                path: 'notifications',
                component: NotoficationsComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class PlacementRoutingModule { }
