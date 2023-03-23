// NOTE: This pipe only supports for following format:
// '1/12' = only month and year
// '2012/12/01' = year, month and day
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {
  transform(startDate: string) {
    if (startDate !== null && startDate !== undefined && startDate !== '') {
      if (startDate.includes('/') === true) {
        if(startDate.split('/')[1].length > 2){
          startDate=startDate.split("/").reverse().join("/");
        }
        if (startDate.split('/').length == 2) {
          let day = '1';
          let year = startDate.split('/')[0];
          let month = startDate.split('/')[1];
          let newstring = year + '/' + month + '/' + day;
          return moment(newstring).format('MMMM YYYY');
        }
      }
    } else {
      return null;
    }
  }
}
