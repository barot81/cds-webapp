import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhealthcareTreeComponent } from './zhealthcare-tree.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ZhealthcareTreeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [ZhealthcareTreeComponent]
})
export class zhealthcareTreeModule { }
