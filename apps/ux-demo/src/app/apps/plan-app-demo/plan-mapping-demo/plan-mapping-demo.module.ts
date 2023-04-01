import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanMappingDemoRoutingModule } from './plan-mapping-demo-routing.module';
import { PlanMappingDemoComponent } from './plan-mapping-demo/plan-mapping-demo.component';
import { zhealthcareTooltipModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { zhealthcareTreeDemoModule } from '../../../ui/zhealthcare-ui-components/tabs/zhealthcare-tree-demo/zhealthcare-tree-demo.module';
import { ChecklistDatabase } from '../../../ui/zhealthcare-ui-components/tabs/zhealthcare-tree-demo/variations/tree-data.service';
import { PlanMappingTreeDB } from './plan-mapping-tree.service';

@NgModule({
  declarations: [PlanMappingDemoComponent],
  imports: [
    CommonModule,
    PlanMappingDemoRoutingModule,
    FuseSharedModule,
    MaterialModule,
    zhealthcareTreeDemoModule,
    FuseSidebarModule,
    zhealthcareTooltipModule
  ],
  providers: [ChecklistDatabase, PlanMappingTreeDB]
})
export class PlanMappingDemoModule { }
