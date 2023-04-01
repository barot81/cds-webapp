import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotAndPlacementDemoRoutingModule } from './slot-and-placement-demo-routing.module';
import { SlotAndPlacementDemoComponent } from './slot-and-placement-demo.component';
import { zhealthcareAvatarModule, zhealthcareBreadcrumbModule, zhealthcareTooltipModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';

@NgModule({
  declarations: [SlotAndPlacementDemoComponent],
  imports: [
    CommonModule,
    SlotAndPlacementDemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    zhealthcareAvatarModule,
    zhealthcareTooltipModule,
    zhealthcareBreadcrumbModule ,
    zhealthcareTagModule,
    MatChipsModule
  ]
})
export class SlotAndPlacementDemoModule { }
