import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { zhealthcareTooltipDemoRoutingModule } from './zhealthcare-tooltip-demo-routing.module';
import { zhealthcareTooltipComponent } from './zhealthcare-tooltip/zhealthcare-tooltip.component';
import { MaterialModule } from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [zhealthcareTooltipComponent, TooltipComponent],
  imports: [
    CommonModule,
    zhealthcareTooltipDemoRoutingModule,
    MaterialModule,
    FuseHighlightModule,
    FlexLayoutModule
  ]
})
export class zhealthcareTooltipDemoModule { }
