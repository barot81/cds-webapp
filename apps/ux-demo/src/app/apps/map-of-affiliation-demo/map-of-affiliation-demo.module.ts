import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapOfAffiliationDemoRoutingModule } from './map-of-affiliation-demo-routing.module';
import { MapOfAffiliationDemoComponent } from './map-of-affiliation-demo.component';
import { ExxatAvatarModule, ExxatTooltipModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MapOfAffiliationDemoComponent],
  imports: [
    CommonModule,
    MapOfAffiliationDemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    ExxatAvatarModule,
    ExxatTooltipModule 
  ]
})
export class MapOfAffiliationDemoModule { }
