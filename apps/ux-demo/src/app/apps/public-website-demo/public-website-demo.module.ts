import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicWebsiteDemoRoutingModule } from './public-website-demo-routing.module';
import { PublicWebsiteDemoComponent } from './public-website-demo.component';
import { ExxatAvatarListItemModule, ExxatAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
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
    ExxatAvatarListItemModule,
    ExxatAvatarModule
  ]
})
export class PublicWebsiteDemoModule { }
