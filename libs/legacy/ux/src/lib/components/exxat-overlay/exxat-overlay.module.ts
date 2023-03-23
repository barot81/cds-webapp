import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatOverlayComponent } from './exxat-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '../../material.module';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [ExxatOverlayComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MaterialModule,
    A11yModule
  ]
})
export class ExxatOverlayModule { }
