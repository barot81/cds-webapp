import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareTimePickerComponent } from './zhealthcare-time-picker/zhealthcare-time-picker.component';
import { zhealthcareClockComponent } from './zhealthcare-clock/zhealthcare-clock.component';
import { zhealthcareTimeComponent } from './zhealthcare-time/zhealthcare-time.component';
import { zhealthcareTimeDialogComponent } from './zhealthcare-time-dialog/zhealthcare-time-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [zhealthcareTimePickerComponent, zhealthcareClockComponent, zhealthcareTimeComponent, zhealthcareTimeDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule
  ],
  exports: [zhealthcareTimePickerComponent, zhealthcareClockComponent, zhealthcareTimeComponent, zhealthcareTimeDialogComponent],
  entryComponents: [zhealthcareTimePickerComponent, zhealthcareClockComponent, zhealthcareTimeComponent, zhealthcareTimeDialogComponent]
})
export class zhealthcareTimePickerModule { }
