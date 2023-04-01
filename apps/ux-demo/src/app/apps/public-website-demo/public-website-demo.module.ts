import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicWebsiteDemoRoutingModule } from './public-website-demo-routing.module';
import { PublicWebsiteDemoComponent } from './public-website-demo.component';
import { zhealthcareAvatarListItemModule, zhealthcareAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicWebsiteAppComponent } from './pages/public-website-app/public-website-app.component';

@NgModule({
  declarations: [PublicWebsiteDemoComponent, PublicWebsiteAppComponent],
  imports: [
    CommonModule,
    PublicWebsiteDemoRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    FuseSidebarModule,
    MaterialModule,
    zhealthcareAvatarListItemModule,
    zhealthcareAvatarModule
  ]
})
export class PublicWebsiteDemoModule { }
