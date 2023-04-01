

import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'ryzen-ess-chips',
  templateUrl: './ess-chips.component.html',
})
export class EssChipsComponent  {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes:  number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: string[] = ['name2@example.com'];
  allEmails: string[] = ['name2@example.com', 'name3@example.com', 'name4@example.com', 'name5@example.com'];

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor() {
  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
    startWith(null),
    map((email: string | null) => email ? this._filter(email) : this.allEmails.slice()));
}

add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add our email
  if ((value || '').trim()) {
    this.emails.push(value.trim());
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }

  this.emailCtrl.setValue(null);
}

remove(email: string): void {
  const index = this.emails.indexOf(email);

  if (index >= 0) {
    this.emails.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.emails.push(event.option.viewValue);
  this.emailInput.nativeElement.value = '';
  this.emailCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allEmails.filter(email => email.toLowerCase().indexOf(filterValue) != -1);
}

}
