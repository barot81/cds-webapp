import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhealthcareOverlayComponent } from './zhealthcare-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '../../material.module';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [ZhealthcareOverlayComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MaterialModule,
    A11yModule
  ]
})
export class zhealthcareOverlayModule { }
