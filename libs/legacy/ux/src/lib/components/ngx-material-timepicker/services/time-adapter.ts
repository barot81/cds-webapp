import { DateTime, LocaleOptions } from 'luxon';

import { TimeFormat } from '../models/time-format.enum';
import { TimeOptions } from '../models/time-options.interface';
import { TimePeriod } from '../models/time-period.enum';
import {
  isBetween,
  isSameOrAfter,
  isSameOrBefore,
} from '../utils/timepicker.utils';

// @dynamic
export class TimeAdapter {
  static DEFAULT_FORMAT = 12;
  static DEFAULT_LOCALE = 'en-US';
  static DEFAULT_NUMBERING_SYSTEM = 'latn';

  static parseTime(time: string, opts: TimeOptions): DateTime {
    const { numberingSystem, locale } = TimeAdapter.getLocaleOptionsByTime(
      time,
      opts
    );
    const isPeriodExist = time.split(' ').length === 2;
    const timeMask = isPeriodExist
      ? TimeFormat.TWELVE_SHORT
      : TimeFormat.TWENTY_FOUR_SHORT;

    return DateTime.fromFormat(time, timeMask, { numberingSystem, locale });
  }

  static formatTime(time: string, opts: TimeOptions): string {
    if (!time) {
      return 'Invalid Time';
    }
    const { format } = opts;
    const _time = this.getFormatedTime(time, format);
    const parsedTime = TimeAdapter.parseTime(_time, opts).setLocale(
      TimeAdapter.DEFAULT_LOCALE
    );
    if (format !== 24) {
      return parsedTime
        .toLocaleString({
          ...DateTime.TIME_SIMPLE,
          hour12: format !== 24,
          numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
        })
        .replace(/\u200E/g, '');
    }
    return parsedTime
      .toISOTime({
        includeOffset: false,
        suppressMilliseconds: true,
        suppressSeconds: true,
      })
      .replace(/\u200E/g, '');
  }

  static toLocaleTimeString(time: string, opts: TimeOptions = {}): string {
    const {
      format = TimeAdapter.DEFAULT_FORMAT,
      locale = TimeAdapter.DEFAULT_LOCALE,
    } = opts;
    const hourCycle: 'h23' | 'h12' | 'h11' | 'h24' =
      format === 24 ? 'h23' : 'h12';
    const timeFormat = { ...DateTime.TIME_SIMPLE, hourCycle };
    const timeMask =
      format === 24 ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;

    const str = this.getFormatedTime(time, format);

    return DateTime.fromFormat(str, timeMask)
      .setLocale(locale)
      .toLocaleString(timeFormat);
  }

  static getFormatedTime(time: string, format: string | number): string {
    let hour: string;
    let minutes: string;
    let meridiem: string;
    if (time && time !== null && format && format !== null) {
      time = time.trim();

      const _times: Array<string> = time.split(':');
      if (_times && _times.length === 2) {
        hour = _times[0].toString().trim();
        minutes = _times[1].toString().trim().slice(0, 2).toString().trim();
        if (format !== 24) {
          meridiem = time.slice(-2).toString().trim();
        }
      }

      let _time: string;

      if (hour && hour !== null && minutes && minutes !== null) {
        _time = (hour + ':' + minutes).toString().trim();
        if (format !== 24 && meridiem && meridiem !== null) {
          _time = (_time + ' ' + meridiem).toString().trim();
        }
      }

      return _time;
    }
  }

  static isTimeAvailable(
    time: string,
    min?: DateTime,
    max?: DateTime,
    granularity?: 'hours' | 'minutes',
    minutesGap?: number | null,
    format?: number
  ): boolean {
    if (!time) {
      return;
    }

    const convertedTime = this.parseTime(time, { format });
    const minutes = convertedTime.minute;

    if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
      throw new Error(
        `Your minutes - ${minutes} doesn't match your minutesGap - ${minutesGap}`
      );
    }
    const isAfter =
      min && !max && isSameOrAfter(convertedTime, min, granularity);
    const isBefore =
      max && !min && isSameOrBefore(convertedTime, max, granularity);
    const between =
      min && max && isBetween(convertedTime, min, max, granularity);
    const isAvailable = !min && !max;

    return isAfter || isBefore || between || isAvailable;
  }

  /***
   *  Format hour according to time format (12 or 24)
   */
  static formatHour(
    currentHour: number,
    format: number,
    period: TimePeriod
  ): number {
    if (format === 24) {
      return currentHour;
    }
    const hour = period === TimePeriod.AM ? currentHour : currentHour + 12;

    if (period === TimePeriod.AM && hour === 12) {
      return 0;
    } else if (period === TimePeriod.PM && hour === 24) {
      return 12;
    }
    return hour;
  }

  static fromDateTimeToString(time: DateTime, format: number): string {
    const timeFormat =
      format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;

    return time
      .reconfigure({
        numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
        locale: TimeAdapter.DEFAULT_LOCALE,
      })
      .toFormat(timeFormat);
  }

  private static getLocaleOptionsByTime(
    time: string,
    opts: TimeOptions
  ): LocaleOptions {
    const { numberingSystem, locale } = DateTime.local()
      .setLocale(opts.locale)
      .resolvedLocaleOpts();
    const localeConfig: LocaleOptions = {
      numberingSystem: numberingSystem,
      locale,
    };
    const defaultConfig: LocaleOptions = {
      numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
      locale: TimeAdapter.DEFAULT_LOCALE,
    };

    return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
  }
}
