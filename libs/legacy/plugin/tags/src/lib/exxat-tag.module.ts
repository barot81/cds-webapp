import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialModule,
  FuseSharedModule,
  FuseMaterialColorPickerModule,
  ExxatTooltipModule,
  AutoOpenMenuModule,
} from '@exxat/ux';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExxatTagComponent } from './components/exxat-tag/exxat-tag.component';
import { ExxatTagShowCaseComponent } from './components/exxat-tag-showcase/exxat-tag-showcase.component';
@NgModule({
  declarations: [ExxatTagComponent, ExxatTagShowCaseComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FuseMaterialColorPickerModule,
    FlexLayoutModule,
    FuseSharedModule,
    ExxatTooltipModule,
    AutoOpenMenuModule,
  ],
  exports: [ExxatTagComponent, ExxatTagShowCaseComponent],
})
export class ExxatTagModule {}
