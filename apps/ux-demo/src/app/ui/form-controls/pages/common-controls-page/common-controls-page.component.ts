import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'common-controls-page',
  templateUrl: './common-controls-page.component.html',
  styleUrls: ['common-controls-page.component.scss'],
})
export class CommonControlsPageComponent implements OnInit {
  form: FormGroup;

  filteredOptions: Observable<string[]>;

  radioButtonList = [
    { value: 'usc', viewValue: 'USC' },
    { value: 'losrios', viewValue: 'LosRios' },
  ];

  checkboxList = [
    { value: 'usc', viewValue: 'USC' },
    { value: 'losrios', viewValue: 'LosRios' },
  ];

  chipsArray: string[] = ['One', 'Two', 'Three'];

  removable = true;
  selectable = true;

  allchips: any[] = [
    { value: 'One', selected: false },
    { value: 'Two', selected: false },
    { value: 'Three', selected: false },
    { value: 'Four', selected: false },
    { value: 'Five', selected: false },
    { value: 'Six', selected: false },
    { value: 'Seven', selected: false },
    { value: 'Eight', selected: false },
    { value: 'Nine', selected: false },
    { value: 'Ten', selected: false },
  ];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  /**
   *
   */
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      checkbox: ['', Validators.required],
      ssn: ['', Validators.required],
      numValue: [{ value: '12341234', disabled: true }, Validators.required],
      addItem: ['Item 1'],
      deleteItem: ['Item 2'],
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
