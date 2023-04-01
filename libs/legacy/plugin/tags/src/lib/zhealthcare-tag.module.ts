import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialModule,
  FuseSharedModule,
  FuseMaterialColorPickerModule,
  zhealthcareTooltipModule,
  AutoOpenMenuModule,
} from '@zhealthcare/ux';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { zhealthcareTagComponent } from './components/zhealthcare-tag/zhealthcare-tag.component';
import { zhealthcareTagShowCaseComponent } from './components/zhealthcare-tag-showcase/zhealthcare-tag-showcase.component';
@NgModule({
  declarations: [zhealthcareTagComponent, zhealthcareTagShowCaseComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FuseMaterialColorPickerModule,
    FlexLayoutModule,
    FuseSharedModule,
    zhealthcareTooltipModule,
    AutoOpenMenuModule,
  ],
  exports: [zhealthcareTagComponent, zhealthcareTagShowCaseComponent],
})
export class zhealthcareTagModule {}
