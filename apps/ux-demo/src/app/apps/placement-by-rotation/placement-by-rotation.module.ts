import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementByRotationRoutingModule } from './placement-by-rotation-routing.module';
import { PlacementByRotationComponent } from './placement-by-rotation.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';

@NgModule({
  declarations: [PlacementByRotationComponent],
  imports: [
    CommonModule,
    PlacementByRotationRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule
  ]
})
export class PlacementByRotationModule { }
