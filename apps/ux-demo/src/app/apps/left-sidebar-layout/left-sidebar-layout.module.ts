import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FuseSharedModule,
  FuseSidebarModule,
  MaterialModule,
  ExxatTooltipModule
} from '@exxat/ux';
import { LeftSidebarLayoutComponent } from './container/left-sidebar-layout.component';
import { LeftSidebarRoutingLayoutModule } from './left-sidebar-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
    LeftSidebarRoutingLayoutModule,
    ExxatTooltipModule
  ],
  declarations: [LeftSidebarLayoutComponent]
})
export class LeftSidebarLayoutModule {}
