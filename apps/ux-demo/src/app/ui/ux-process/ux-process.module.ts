import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UxProcessRoutingModule } from './ux-process-routing.module';
import { UxProcessComponent } from './ux-process/ux-process.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UxProcessComponent],
  imports: [
    CommonModule,
    UxProcessRoutingModule,
    FlexLayoutModule
  ]
})
export class UxProcessModule { }
