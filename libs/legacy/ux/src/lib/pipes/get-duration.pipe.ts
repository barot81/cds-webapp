// NOTE: This pipe only supports for following format:
// '1/12' = only month and year
// '2012/12/01' = year, month and day
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'getDuration'
})
export class GetDurationPipe implements PipeTransform {
  transform(startDate: any, endDate: any): any {
    if (
      startDate !== undefined &&
      startDate !== '' &&
      startDate !== null &&
      startDate !== '0/0' &&
      endDate !== undefined &&
      endDate !== '' &&
      endDate !== null &&
      endDate !== '0/0'
    ) {
      if (startDate === endDate) {
        return null;
      }
      if (startDate.split('.')[2] !== undefined) {
        return null;
      }
      if (startDate.split('/')[2] !== undefined) {
        return null;
      }
      if (endDate.split('.')[2] !== undefined) {
        return null;
      }
      if (endDate.split('/')[2] !== undefined) {
        return null;
      }
      //
      if (startDate.split('/')[1].length > 2) {
        return null;
      }
      if (endDate.split('/')[1].length > 2) {
        return null;
      }
      ///

      let toDate = moment(this.getToDate(startDate));
      let fromDate = moment(this.getFromDate(endDate));
      let getD = this.getDiff(toDate, fromDate);
      return getD;
    } else {
      return null;
    }
  }
  getToDate(startDate) {
    if (startDate.includes('/') === true) {
      if (startDate.split('/').length == 2) {
        const temp = startDate.split('/');
        return temp[0] + '-' + temp[1] + '-' + 1;
      }
    } else {
      return startDate;
    }
  }
  getFromDate(endDate) {
    if (endDate.includes('/') === true) {
      if (endDate.split('/').length == 2) {
        const temp = endDate.split('/');
        return temp[0] + '-' + temp[1] + '-' + 1;
      }
    } else {
      return endDate;
    }
  }
  getDiff(date1, date2) {
    var b = moment(date1),
      a = moment(date2),
      intervals: any = ['year', 'month'],
      out = [];

    for (var i = 0; i < intervals.length; i++) {
      var diff = a.diff(b, intervals[i]);
      b.add(diff, intervals[i]);
      if (diff !== 0) {
        if (diff > 1) {
          out.push(diff + ' ' + `${intervals[i]}s`);
        }
        else{

          out.push(diff + ' ' + intervals[i]);
        }
      }
    }
    return out.join(', ');
  }
}
