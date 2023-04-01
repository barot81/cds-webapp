import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotDemoRoutingModule } from './slot-demo-routing.module';
import { SlotDemoComponent } from './slot-demo.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';

@NgModule({
  declarations: [SlotDemoComponent],
  imports: [
    CommonModule,
    SlotDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule
  ]
})
export class SlotDemoModule { }
