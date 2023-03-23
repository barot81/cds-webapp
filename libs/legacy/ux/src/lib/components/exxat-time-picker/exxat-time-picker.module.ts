import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatTimePickerComponent } from './exxat-time-picker/exxat-time-picker.component';
import { ExxatClockComponent } from './exxat-clock/exxat-clock.component';
import { ExxatTimeComponent } from './exxat-time/exxat-time.component';
import { ExxatTimeDialogComponent } from './exxat-time-dialog/exxat-time-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExxatTimePickerComponent, ExxatClockComponent, ExxatTimeComponent, ExxatTimeDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule
  ],
  exports: [ExxatTimePickerComponent, ExxatClockComponent, ExxatTimeComponent, ExxatTimeDialogComponent],
  entryComponents: [ExxatTimePickerComponent, ExxatClockComponent, ExxatTimeComponent, ExxatTimeDialogComponent]
})
export class ExxatTimePickerModule { }
