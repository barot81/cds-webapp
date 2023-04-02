export class DateRemoveEvent<D = Date> {
    /** (datepicker). */
    type: 'datepicker';
    /** Date removed. */
    date: D;
  }