import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { TimeUnit } from '../models/time-unit.enum';
import { TIME_LOCALE } from '../tokens/time-locale.token';

type TimeMeasure = 'hour' | 'minute';

@Pipe({
  name: 'timeParser',
})
@Injectable()
export class TimeParserPipe implements PipeTransform {
  private readonly numberingSystem: string;

  constructor(@Inject(TIME_LOCALE) private locale: string) {
    this.numberingSystem = DateTime.local()
      .setLocale(this.locale)
      .resolvedLocaleOpts().numberingSystem;
  }

  transform(time: string | number, timeUnit = TimeUnit.HOUR): number | string {
    if (time == null || time === '') {
      return '';
    }

    if (!isNaN(+time)) {
      return time;
    }

    if (timeUnit === TimeUnit.MINUTE) {
      return this.parseTime(time, 'm', 'minute');
    }

    return this.parseTime(time, 'H', 'hour');
  }

  private parseTime(
    time: string | number,
    format: string,
    timeMeasure: TimeMeasure
  ): number {
    const parsedTime = DateTime.fromFormat(this.getFormatedTime(time), format, {
      numberingSystem: this.numberingSystem,
    })[timeMeasure];

    if (!isNaN(parsedTime)) {
      return parsedTime;
    }

    throw new Error(`Cannot parse time - ${time}`);
  }

  private getFormatedTime(time: string | number): string {
    time = time.toString();

    let hour: string;
    let minutes: string;
    let meridiem: string;
    if (time && time !== null) {
      time = time.trim();

      const _times: Array<string> = time.split(':');
      if (_times && _times.length === 2) {
        hour = _times[0].toString().trim();
        minutes = _times[1].toString().trim().slice(0, 2).toString().trim();
        meridiem = time.slice(-2).toString().trim();
      }

      if (
        hour &&
        hour !== null &&
        minutes &&
        minutes !== null &&
        meridiem &&
        meridiem !== null
      ) {
        return hour + ':' + minutes + ' ' + meridiem;
      } else return time;
    }
  }
}
