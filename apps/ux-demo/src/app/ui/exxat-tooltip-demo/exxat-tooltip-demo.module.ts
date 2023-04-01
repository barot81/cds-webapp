import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExxatTooltipDemoRoutingModule } from './exxat-tooltip-demo-routing.module';
import { ExxatTooltipComponent } from './exxat-tooltip/exxat-tooltip.component';
import { MaterialModule } from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [ExxatTooltipComponent, TooltipComponent],
  imports: [
    CommonModule,
    ExxatTooltipDemoRoutingModule,
    MaterialModule,
    FuseHighlightModule,
    FlexLayoutModule
  ]
})
export class ExxatTooltipDemoModule { }
