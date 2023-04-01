import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotBySiteRoutingModule } from './slot-by-site-routing.module';
import { SlotBySiteComponent } from './slot-by-site.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule, LayoutModule, FuseSidebarModule, FuseSharedModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';

@NgModule({
  declarations: [SlotBySiteComponent],
  imports: [
    CommonModule,
    SlotBySiteRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule
  ]
})

export class SlotBySiteModule { }
