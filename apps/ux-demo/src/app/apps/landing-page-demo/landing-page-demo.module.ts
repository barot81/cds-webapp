import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageDemoRoutingModule } from './landing-page-demo-routing.module';
import { LandingPageDemoComponent } from './landing-page-demo.component';
import { zhealthcareAvatarListItemModule, zhealthcareAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
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
    zhealthcareAvatarListItemModule,
    zhealthcareAvatarModule
  ]
})
export class LandingPageDemoModule { }
