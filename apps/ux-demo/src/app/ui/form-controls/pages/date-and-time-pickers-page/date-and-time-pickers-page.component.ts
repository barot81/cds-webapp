import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';

@Component({
  selector: 'date-and-time-pickers-page',
  templateUrl: './date-and-time-pickers-page.component.html',
  styleUrls: ['date-and-time-pickers-page.component.scss'],
})
export class DateAndTimePickersPageComponent implements OnInit {
  form: FormGroup;

  //pass min/max date for selection 
  //@param year — The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
  //@param monthIndex — The month as a number between 0 and 11 (January to December).
  //@param date — The date as a number between 1 and 31.
  minDate = new Date(2022, 2, 1);
  maxDate = new Date(2024, 3, 12);

  public modelRequired: Date[] = [];

  public modelPredefined = [
    _moment([2023, 1, 1]),
    _moment([2023, 1, 2]),
    _moment([2023, 1, 3]),
    _moment([2023, 1, 4]),
    _moment([2023, 1, 5]),
  ];

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      scheduleDate: ['', Validators.required],
      timeIn: ['', Validators.required],
      timeField: ['', Validators.required],
      multipleDate: [[]]
    });
  }

  //demo example for filter can change or remove filter logic according to requirement 
  dateFilter(date: Date | null):boolean {
    const day = new Date(date).getDay()
    return day !== 0 && day !== 6;
  } 

  ngOnInit(): void { 
    //demo example for patching values based on dateFilter if required 
    //can be modified/removed according to requirement
    let filteredDate = this.modelPredefined.map((dates) => {
      return dates.toDate()
    }).filter((date)=> {
      const day = new Date(date).getDay()
      if(day !== 0 && day !== 6){
        return date
      } 
    }).map((date) => {
      return _moment(date)
    })
    
    this.form.patchValue({multipleDate: filteredDate});
  }

  getControlError(control: any) {
    if (this.form.touched) {
      const value =
        this.form.get(control).touched && this.form.get(control).invalid;
      return value;
    }
  }

  public resetTimePicker() {
    this.form.get('timeField').markAsUntouched();
    this.form.get('timeField').reset();
  }
}
