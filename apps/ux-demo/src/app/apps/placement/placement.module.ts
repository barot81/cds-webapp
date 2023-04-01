import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementComponent } from './placement.component';
import { PlacementTabNavBarComponent } from './placement-tab-nav-bar/placement-tab-nav-bar.component';
import { ManagePlacementsComponent } from './tabs/manage-placements/manage-placements.component';
import { PlacementDashboardComponent } from './tabs/placement-dashboard/placement-dashboard.component';
import { PlacementRoutingModule } from './placement-routing.module';
import { MaterialModule, FuseSharedModule, FuseSidebarModule, ExxatAvatarModule, ExxatAvatarListItemModule, ExxatTooltipModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfigurationComponent } from './tabs/configuration/configuration.component';
import { ManageSlotsComponent } from './tabs/manage-slots/manage-slots.component';
import { WishlistsComponent } from './tabs/wishlists/wishlists.component';
import { NotoficationsComponent } from './tabs/notofications/notofications.component';
import { EditSlotComponent } from './pages/edit-slot/edit-slot.component';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { RotationDrawerComponent } from './tabs/manage-placements/rotation-drawer/rotation-drawer.component';
import { AddSlotComponent } from './pages/add-slot/add-slot.component';
import { PerformPlacementComponent } from './pages/perform-placement/perform-placement.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddEditWishlistComponent } from './pages/add-edit-wishlist/add-edit-wishlist.component';

@NgModule({
  declarations: [PlacementComponent, PlacementTabNavBarComponent, ManagePlacementsComponent, PlacementDashboardComponent, ConfigurationComponent, ManageSlotsComponent, WishlistsComponent, NotoficationsComponent, RotationDrawerComponent,EditSlotComponent, AddSlotComponent, PerformPlacementComponent, AddEditWishlistComponent],
  imports: [
    CommonModule,
    PlacementRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    ExxatAvatarModule,
    ExxatAvatarListItemModule,
    DragDropModule,
    ExxatTooltipModule
  ],
  providers: [UXDemoDrawerService],
})
export class PlacementModule { }
