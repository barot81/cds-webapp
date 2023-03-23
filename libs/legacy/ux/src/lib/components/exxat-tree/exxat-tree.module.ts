import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatTreeComponent } from './exxat-tree.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ExxatTreeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [ExxatTreeComponent]
})
export class ExxatTreeModule { }
