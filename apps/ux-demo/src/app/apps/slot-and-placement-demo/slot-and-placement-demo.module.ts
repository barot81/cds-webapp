import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotAndPlacementDemoRoutingModule } from './slot-and-placement-demo-routing.module';
import { SlotAndPlacementDemoComponent } from './slot-and-placement-demo.component';
import { ExxatAvatarModule, ExxatBreadcrumbModule, ExxatTooltipModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { ExxatTagModule } from '@exxat/plugin/tags';

@NgModule({
  declarations: [SlotAndPlacementDemoComponent],
  imports: [
    CommonModule,
    SlotAndPlacementDemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    ExxatAvatarModule,
    ExxatTooltipModule,
    ExxatBreadcrumbModule ,
    ExxatTagModule,
    MatChipsModule
  ]
})
export class SlotAndPlacementDemoModule { }
