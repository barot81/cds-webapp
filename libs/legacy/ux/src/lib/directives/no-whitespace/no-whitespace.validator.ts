import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: string } => {
    if(control.value != ''){
        let isWhitespace = (control.value)?.trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { whitespace: 'Invalid Input' }
    }
  };
}