import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonFromSiteLocationRoutingModule } from './person-from-site-location-routing.module';
import { PersonFromSiteLocationComponent } from './person-from-site-location.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PersonFromSiteLocationComponent],
  imports: [
    CommonModule,
    PersonFromSiteLocationRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class PersonFromSiteLocationModule { }
