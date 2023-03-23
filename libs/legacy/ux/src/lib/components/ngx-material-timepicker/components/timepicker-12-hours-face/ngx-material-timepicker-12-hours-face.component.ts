/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DateTime } from 'luxon';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';

@Component({
  selector: 'ngx-material-timepicker-12-hours-face',
  templateUrl: 'ngx-material-timepicker-12-hours-face.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxMaterialTimepicker12HoursFaceComponent implements OnChanges {
  @Input() period: TimePeriod;

  @Input() selectedHour: ClockFaceTime;
  @Input() minTime: DateTime;
  @Input() maxTime: DateTime;
  @Input() format: number;

  @Output() hourChange = new EventEmitter<ClockFaceTime>();
  @Output() hourSelected = new EventEmitter<number>();

  hoursList: ClockFaceTime[] = [];

  constructor() {
    this.hoursList = TimepickerTimeUtils.getHours(12);
  }

  onTimeSelected(time: number): void {
    this.hourSelected.next(time);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['period'] && changes['period'].currentValue) {
      this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period,
      });
    }
  }
}
