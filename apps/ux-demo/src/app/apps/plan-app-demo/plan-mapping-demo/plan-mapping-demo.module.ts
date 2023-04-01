import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanMappingDemoRoutingModule } from './plan-mapping-demo-routing.module';
import { PlanMappingDemoComponent } from './plan-mapping-demo/plan-mapping-demo.component';
import { ExxatTooltipModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { ExxatTreeDemoModule } from '../../../ui/exxat-ui-components/tabs/exxat-tree-demo/exxat-tree-demo.module';
import { ChecklistDatabase } from '../../../ui/exxat-ui-components/tabs/exxat-tree-demo/variations/tree-data.service';
import { PlanMappingTreeDB } from './plan-mapping-tree.service';

@NgModule({
  declarations: [PlanMappingDemoComponent],
  imports: [
    CommonModule,
    PlanMappingDemoRoutingModule,
    FuseSharedModule,
    MaterialModule,
    ExxatTreeDemoModule,
    FuseSidebarModule,
    ExxatTooltipModule
  ],
  providers: [ChecklistDatabase, PlanMappingTreeDB]
})
export class PlanMappingDemoModule { }
