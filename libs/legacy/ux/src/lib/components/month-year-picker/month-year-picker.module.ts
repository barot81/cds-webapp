import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthYearPickerComponent } from './month-year-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [MonthYearPickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [MonthYearPickerComponent]
})
export class MonthYearPickerModule { }
