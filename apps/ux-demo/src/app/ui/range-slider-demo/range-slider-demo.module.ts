import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RangeSliderDemoRoutingModule } from './range-slider-demo-routing.module';
import { RangeSliderExampleOneComponent } from './pages/range-slider-example-one/range-slider-example-one.component';
import { FuseThemeOptionsModule, MaterialModule, RangeSliderModule } from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [RangeSliderExampleOneComponent],
  imports: [
    CommonModule,
    RangeSliderDemoRoutingModule,
    MaterialModule,
    FuseHighlightModule,
    FlexLayoutModule,
    RangeSliderModule,
    FuseThemeOptionsModule
  ]
})
export class RangeSliderDemoModule { }
