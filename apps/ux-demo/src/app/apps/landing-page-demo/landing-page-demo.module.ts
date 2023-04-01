import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageDemoRoutingModule } from './landing-page-demo-routing.module';
import { LandingPageDemoComponent } from './landing-page-demo.component';
import { ExxatAvatarListItemModule, ExxatAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LandingPageDemoComponent],
  imports: [
    CommonModule,
    LandingPageDemoRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    FuseSidebarModule,
    MaterialModule,
    ExxatAvatarListItemModule,
    ExxatAvatarModule
  ]
})
export class LandingPageDemoModule { }
