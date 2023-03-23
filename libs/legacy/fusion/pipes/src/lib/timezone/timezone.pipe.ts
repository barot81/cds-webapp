import { DatePipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { OrgUnitInformation } from '@zhealthcare/fusion/models';
import moment from 'moment-timezone';
@Pipe({
  name: 'timezone',
})
@Injectable({ providedIn: 'root' })
export class TimezonePipe extends DatePipe implements PipeTransform {
  moment = require('moment-timezone');

  abbrs = {
    'Eastern Standard Time': 'EST',
    'Eastern Daylight Time': 'EDT',
    'Central Standard Time': 'CST',
    'Central Daylight Time': 'CDT',
    'Mountain Standard Time': 'MST',
    'Mountain Daylight Time': 'MDT',
    'Pacific Standard Time': 'PST',
    'Pacific Daylight Time': 'PDT',
    'Alaskan Standard Time': 'AK',
    'Alaskan Daylight Time': 'AKDT',
    'Indian Standard Time': '+05:30',
  };

  abbrsTzMapping = {
    'Eastern Standard Time': 'America/New_York',
    'Eastern Daylight Time': 'America/New_York',
    'Central Standard Time': 'America/Chicago',
    'Central Daylight Time': 'America/Chicago',
    'Mountain Standard Time': 'America/Denver',
    'Mountain Daylight Time': 'America/Denver',
    'Pacific Standard Time': 'America/Los_Angeles',
    'Pacific Daylight Time': 'America/Los_Angeles',
    'Alaskan Standard Time': 'America/Anchorage',
    'Alaskan Daylight Time': 'America/Anchorage',
    'Indian Standard Time': 'Asia/Kolkata',
  };

  /**
   * Please Pass UTC Datetime stamp.
   */
  transform(date, format) {
    const currentOrgUnitInfo: OrgUnitInformation = JSON.parse(
      localStorage.getItem('orgUnitInformation')
    )?.find((x) => x.isSelected);

    if (currentOrgUnitInfo === (undefined || null)) {
      return super.transform(date, format);
    }

    const timezoneOffset = this.getTimeZoneOffset(date, currentOrgUnitInfo);
    if (timezoneOffset !== null && timezoneOffset !== undefined) {
      const SchoolTimeZoneDate = super.transform(
        date,
        format,
        timezoneOffset === 'AK' ? '-09:00' : timezoneOffset
      );
      return SchoolTimeZoneDate;
    }
    return date.toString();
  }

  /**
   *
   * Returns the time converted to timezone of the school and covert to UTC in the format specified
   *
   * @param {string | Moment} date The number to raise
   * @param {string} format The format to return the date in
   * @return {string} - The date in the format specified
   */
  convertToSchoolTimezone(
    date: string | moment.Moment,
    format: string
  ): string {
    const currentOrgUnitInfo: OrgUnitInformation = JSON.parse(
      localStorage.getItem('orgUnitInformation')
    )?.find((x) => x.isSelected);
    if (!currentOrgUnitInfo?.timeZoneLocation) {
      console.log('No timezone location found');
      throw new Error('The timezone location is not found.');
    }
    const formatWithoutTimezone = 'YYYY-MM-DD HH:mm:ss';
    moment.tz.setDefault(currentOrgUnitInfo.timeZoneLocation);
    const timeZoneConverted =
      typeof date !== 'string'
        ? moment(date.format(formatWithoutTimezone))
        : moment(date);
    const result = timeZoneConverted.utc().format(format);
    moment.tz.setDefault();
    return result;
  }

  convertToSchoolTimezoneFallback(
    date: string | Date | moment.Moment,
    format
  ): string {
    const tzTimeZone = this.getTzTimezone();
    const formatWithoutTimezone = 'YYYY-MM-DD HH:mm:ss';
    const timeWitoutTimezone =
      typeof date === 'string' || date instanceof Date
        ? moment(date).format(formatWithoutTimezone)
        : date.format(formatWithoutTimezone);
    console.log(timeWitoutTimezone);
    moment.tz.setDefault(tzTimeZone);
    const result = moment
      .tz(timeWitoutTimezone, formatWithoutTimezone, tzTimeZone)
      .utc()
      .format(format);
    moment.tz.setDefault();
    return result;
  }

  getTimeZoneAbbr(): string {
    const currentOrgUnitInfo: OrgUnitInformation = JSON.parse(
      localStorage.getItem('orgUnitInformation')
    )?.find((x) => x.isSelected);
    return this.abbrs[currentOrgUnitInfo.timeZone];
  }

  getTzTimezone(): string {
    const currentOrgUnitInfo: OrgUnitInformation = JSON.parse(
      localStorage.getItem('orgUnitInformation')
    )?.find((x) => x.isSelected);
    return this.abbrsTzMapping[currentOrgUnitInfo.timeZone];
  }

  getCurrentSchoolDate(requiredFormat: string): string {
    return this.transform(new Date(), requiredFormat);
  }

  getTimeZoneOffset(date, currentOrgUnitInfo): string {
    let timezoneOffset: string;
    if (
      currentOrgUnitInfo?.timeZoneLocation !== null &&
      currentOrgUnitInfo?.timeZoneLocation !== undefined
    ) {
      timezoneOffset = this.moment(date)
        .tz(currentOrgUnitInfo?.timeZoneLocation)
        .format('Z');
    } else if (
      currentOrgUnitInfo?.timezoneShortForm !== null &&
      currentOrgUnitInfo?.timezoneShortForm !== undefined
    ) {
      timezoneOffset = currentOrgUnitInfo?.timezoneShortForm;
    } else {
      timezoneOffset = currentOrgUnitInfo?.timeZone;
      if (this.isDST()) {
        timezoneOffset = currentOrgUnitInfo?.timeZone.replace(
          'Standard',
          'Daylight'
        );
      }
      const abbreviation = this.abbrs[timezoneOffset];
      timezoneOffset = abbreviation ?? '';
    }
    return timezoneOffset;
  }

  isDST(date = new Date()) {
    const january = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const july = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();

    return Math.max(january, july) !== date.getTimezoneOffset();
  }

  getTimeZoneOffsetValue(abbreviation: string): string {
    const timezoneMapping = {
      EST: '-05:00',
      EDT: '-04:00',
      PST: '-08:00',
      PDT: '-07:00',
      MST: '-07:00',
      MDT: '-06:00',
      CST: '-06:00',
      CDT: '-05:00',
      AK: '-09:00',
      AKDT: '-08:00',
      IST: '+05:30',
    };
    return timezoneMapping[abbreviation] ? timezoneMapping[abbreviation] : '';
  }
}
