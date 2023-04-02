import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { zhealthcareCalendarComponent } from './zhealthcare-calendar.component';

@NgModule({
  declarations: [zhealthcareCalendarComponent],
  imports: [CommonModule,MaterialModule, ReactiveFormsModule, FormsModule, FlexLayoutModule],
  exports: [zhealthcareCalendarComponent],
})
export class zhealthcareCalendarModule {}
