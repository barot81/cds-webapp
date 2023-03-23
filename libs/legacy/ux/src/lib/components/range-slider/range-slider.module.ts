import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [RangeSliderComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  exports: [RangeSliderComponent]
})
export class RangeSliderModule { }
