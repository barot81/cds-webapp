import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceDocumentDemoRoutingModule } from './compliance-document-demo-routing.module';
import { ComplianceDocumentDemoComponent } from './compliance-document-demo.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule, ExxatTooltipModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';

@NgModule({
  declarations: [ComplianceDocumentDemoComponent],
  imports: [
    CommonModule,
    ComplianceDocumentDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    ExxatTooltipModule 
  ],
  providers:[UXDemoDrawerService]
})
export class ComplianceDocumentDemoModule { }
