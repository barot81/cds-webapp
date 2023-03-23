import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { ExxatTooltipModule } from '../exxat-tooltip/modules/tooltip.module';
import { SpecializedChipsComponent } from './specialized-chips.component';
@NgModule({
  declarations: [SpecializedChipsComponent],
  imports: [CommonModule, ExxatTooltipModule, MaterialModule, FlexLayoutModule],
  exports: [SpecializedChipsComponent],
})
export class SpecializedChipsModule {}
