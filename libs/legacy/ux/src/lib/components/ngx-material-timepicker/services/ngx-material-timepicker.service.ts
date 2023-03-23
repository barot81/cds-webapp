import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClockFaceTime } from '../models/clock-face-time.interface';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';

const DEFAULT_HOUR: ClockFaceTime = {
  time: 12,
  angle: 360,
};
const DEFAULT_MINUTE: ClockFaceTime = {
  time: 0,
  angle: 360,
};

@Injectable({
  providedIn: 'root',
})
export class NgxMaterialTimepickerService {
  private hourSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_HOUR);
  private minuteSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_MINUTE);
  private periodSubject = new BehaviorSubject<TimePeriod>(TimePeriod.AM);

  set hour(hour: ClockFaceTime) {
    this.hourSubject.next(hour);
  }

  get selectedHour(): Observable<ClockFaceTime> {
    return this.hourSubject.asObservable();
  }

  set minute(minute: ClockFaceTime) {
    this.minuteSubject.next(minute);
  }

  get selectedMinute(): Observable<ClockFaceTime> {
    return this.minuteSubject.asObservable();
  }

  set period(period: TimePeriod) {
    const isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM;

    if (isPeriodValid) {
      this.periodSubject.next(period);
    }
  }

  get selectedPeriod(): Observable<TimePeriod> {
    return this.periodSubject.asObservable();
  }

  setDefaultTimeIfAvailable(
    time: string,
    min: DateTime,
    max: DateTime,
    format: number,
    minutesGap?: number
  ) {
    /* Workaround to double error message*/
    try {
      if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
        this.setDefaultTime(time, format);
      }
    } catch (e) {
      console.error(e);
    }
  }

  getFullTime(format: number): string {
    const selectedHour = this.hourSubject.getValue().time;
    const selectedMinute = this.minuteSubject.getValue().time;
    const hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
    const minute =
      selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
    const period = format === 12 ? this.periodSubject.getValue() : '';
    // const time = `${hour}:${minute} ${period}`.trim();
    const time = (hour + ':' + minute + ' ' + period).trim();
    return TimeAdapter.formatTime(time, { format });
  }

  private setDefaultTime(time: string, format: number) {
    const defaultTime = TimeAdapter.parseTime(this.getFormatedTime(time), {
      format,
    }).toJSDate();
    if (DateTime.fromJSDate(defaultTime).isValid) {
      const period = time.substr(time.length - 2).toUpperCase();
      const hour = defaultTime.getHours();

      this.hour = {
        ...DEFAULT_HOUR,
        time: formatHourByPeriod(hour, period as TimePeriod),
      };
      this.minute = { ...DEFAULT_MINUTE, time: defaultTime.getMinutes() };
      this.period = period as TimePeriod;
    } else {
      this.resetTime();
    }
  }

  private getFormatedTime(time: string): string {
    let hour: string;
    let minutes: string;
    let meridiem: string;
    if (time && time !== null) {
      time = time.trim();

      const _times: Array<string> = time.split(':');
      if (_times && _times.length === 2) {
        hour = _times[0].toString().trim();
        minutes = _times[1].toString().trim().slice(0, 2).toString().trim();
        if (time.toString().trim().length > 5) {
          meridiem = time.slice(-2).toString().trim();
        }
      }

      let _time: string;

      if (hour && hour !== null && minutes && minutes !== null) {
        _time = (hour + ':' + minutes).toString().trim();
        if (meridiem && meridiem !== null) {
          _time = (_time + ' ' + meridiem).toString().trim();
        }
      }

      return _time;
    }
  }

  private resetTime(): void {
    this.hour = { ...DEFAULT_HOUR };
    this.minute = { ...DEFAULT_MINUTE };
    this.period = TimePeriod.AM;
  }
}

/***
 *  Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(hour: number, period: TimePeriod): number {
  switch (period) {
    case TimePeriod.AM:
      return hour === 0 ? 12 : hour;
    case TimePeriod.PM:
      return hour === 12 ? 12 : hour - 12;
    default:
      return hour;
  }
}
