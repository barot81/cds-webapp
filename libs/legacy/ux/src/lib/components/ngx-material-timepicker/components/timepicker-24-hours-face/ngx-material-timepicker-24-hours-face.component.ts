/* eslint-disable @angular-eslint/component-selector */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';

@Component({
  selector: 'ngx-material-timepicker-24-hours-face',
  templateUrl: 'ngx-material-timepicker-24-hours-face.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxMaterialTimepicker24HoursFaceComponent
  implements AfterContentInit
{
  @Input() selectedHour: ClockFaceTime;
  @Input() minTime: DateTime;
  @Input() maxTime: DateTime;
  @Input() format: number;

  @Output() hourChange = new EventEmitter<ClockFaceTime>();
  @Output() hourSelected = new EventEmitter<number>();

  hoursList: ClockFaceTime[] = [];

  constructor() {
    this.hoursList = TimepickerTimeUtils.getHours(24);
  }

  onTimeSelected(time: number): void {
    this.hourSelected.next(time);
  }
  ngAfterContentInit() {
    this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
      min: this.minTime,
      max: this.maxTime,
      format: this.format,
    });
  }
}
