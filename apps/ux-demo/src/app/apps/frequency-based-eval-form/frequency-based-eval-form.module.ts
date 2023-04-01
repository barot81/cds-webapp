import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequencyBasedEvalFormRoutingModule } from './frequency-based-eval-form-routing.module';
import { FrequencyBasedEvalFormComponent } from './frequency-based-eval-form.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EvalFormTableComponent } from './eval-form-table/eval-form-table.component';
import { FrequencyBasedEvalFormDrawerComponent } from './frequency-based-eval-form-drawer/frequency-based-eval-form-drawer.component';

@NgModule({
  declarations: [FrequencyBasedEvalFormComponent, EvalFormTableComponent, FrequencyBasedEvalFormDrawerComponent],
  imports: [
    CommonModule,
    FrequencyBasedEvalFormRoutingModule,
    FuseSharedModule,
    MaterialModule,
    FuseSidebarModule,
    FlexLayoutModule
  ]
})
export class FrequencyBasedEvalFormModule { }
