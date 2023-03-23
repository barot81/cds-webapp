/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  forwardRef,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

@Injectable({ providedIn: 'any' })
export class MonthYearDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    const formatString = 'MMM, YYYY';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'month-year-picker',
  templateUrl: './month-year-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearPickerComponent),
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MonthYearDateAdapter,
    },
  ],
})
export class MonthYearPickerComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  public _value;
  setDate: any;
  @Input() startView = 'multi-year';
  @Input() required: boolean;
  @Input() min: any;
  @Input() max: any;
  @Input() placeholder: string;
  @Input() label = '';

  updatedMinDate;
  updatedMaxDate;
  propagateChange = (d: any) => {};
  propagateTouch = (d: any) => {};

  ngOnInit() {
    if (this.min !== undefined && this.min !== null) {
      this.min = this.min.toLocaleDateString();
      this.min = this.formatBuilder(this.min);
      this.updatedMinDate = new Date(this.min);
    }
    if (this.max !== undefined && this.max !== null) {
      this.max = this.max.toLocaleDateString();
      this.max = this.formatBuilder(this.max);
      this.updatedMaxDate = new Date(this.max);
    }
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }

  writeValue(value: any) {
    if (value !== undefined && value !== '' && value !== null) {
      //const formatString = this.formatBuilder(value);
      // this._value = formatString;
      this._value = new Date(value);
    } else {
      this._value = null;
    }
    this.propagateChange(this._value);
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn) {
    this.propagateTouch = fn;
  }

  fromDateSelected(event: Date, datepicker) {
    if (event && event !== null) {
      this._value = event.toLocaleDateString();
      // const dateSplit = this._value.split('/');
      const _year = event.getFullYear();
      const _month = event.getMonth() < 12 ? event.getMonth() + 1 : 1;
      this.propagateChange(_year + '/' + _month); // => 'YYYY / MM'
      datepicker.close();
      this._value = new Date(event);
    }
  }

  formatBuilder(date): string {
    if (date !== null && date !== undefined) {
      if (date.toString().includes('/') === false) {
        return null;
      }
      const dateSplit = date.split('/');
      if (dateSplit.length === 3) {
        /** This Condition is added later */
        return dateSplit[2] + '/' + dateSplit[0] + '/' + dateSplit[1];
      }
      const dateResult = dateSplit[0] + '/' + dateSplit[1] + '/01'; // => 'YYYY / MM'
      return dateResult;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.min !== undefined) {
      if (
        changes.min.currentValue !== undefined &&
        changes.min.currentValue !== null
      ) {
        this.updatedMinDate = changes.min.currentValue.toLocaleDateString();
        this.updatedMinDate = new Date(this.min);
      } else {
        this.updatedMinDate = null;
      }
    }
    if (changes.max !== undefined) {
      if (
        changes.max.currentValue !== undefined &&
        changes.max.currentValue !== null
      ) {
        this.updatedMaxDate = changes.max.currentValue.toLocaleDateString();
        this.updatedMaxDate = new Date(this.max);
      } else {
        this.updatedMaxDate = null;
      }
    }
  }
}
