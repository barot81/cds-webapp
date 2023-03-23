import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chipsCharSlice',
  pure: false
})
export class ChipsCharSlice implements PipeTransform {
  transform(value: string, maxChars: number = 13): string {
    if (value.length < maxChars) {
      return value;
    } else {
      return value.slice(0, maxChars) + '...';
    }
  }
}
