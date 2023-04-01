import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasuresDrawersDemoRoutingModule } from './measures-drawers-demo-routing.module';
import { MeasuresDrawersDemoComponent } from './measures-drawers-demo.component';
import { FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { MeasuresDrawerDetailsTabComponent } from './measures-drawer-details-tab/measures-drawer-details-tab.component';
import { FileUploadModule } from '@exxat/plugin/file-upload';
import { MeasuresDrawerLinkingTabComponent } from './measures-drawer-linking-tab/measures-drawer-linking-tab.component';
import { ExxatTreeDemoModule } from '../../../../ui/exxat-ui-components/tabs/exxat-tree-demo/exxat-tree-demo.module';

@NgModule({
  declarations: [MeasuresDrawersDemoComponent, MeasuresDrawerDetailsTabComponent, MeasuresDrawerLinkingTabComponent],
  imports: [
    CommonModule,
    MeasuresDrawersDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    FileUploadModule,
    ExxatTreeDemoModule
  ]
})
export class MeasuresDrawersDemoModule { }
