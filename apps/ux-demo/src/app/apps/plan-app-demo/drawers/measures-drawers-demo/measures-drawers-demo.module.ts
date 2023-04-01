import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasuresDrawersDemoRoutingModule } from './measures-drawers-demo-routing.module';
import { MeasuresDrawersDemoComponent } from './measures-drawers-demo.component';
import { FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MeasuresDrawerDetailsTabComponent } from './measures-drawer-details-tab/measures-drawer-details-tab.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { MeasuresDrawerLinkingTabComponent } from './measures-drawer-linking-tab/measures-drawer-linking-tab.component';
import { zhealthcareTreeDemoModule } from '../../../../ui/zhealthcare-ui-components/tabs/zhealthcare-tree-demo/zhealthcare-tree-demo.module';

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
    zhealthcareTreeDemoModule
  ]
})
export class MeasuresDrawersDemoModule { }
