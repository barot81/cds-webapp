import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

//dropdown search
export class DropdownSearchItem {
  id: number;
  title: string;
}
@Component({
  selector: 'add-benchmark',
  templateUrl: './add-benchmark.component.html',
})
export class addBenchmarkComponent implements OnInit {
  //dropdown with setting
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  filteredDropdownSearchData: Observable<Array<DropdownSearchItem>>;

  form: FormGroup;
  data: any;
  key: string;
  checked = false;
  indeterminate = false;

  //dropdown with search
  dropdownSearchData: Array<DropdownSearchItem> = [
    {
      id: 1,
      title: 'Setting 1',
    },
    {
      id: 2,
      title: 'Setting 2',
    },
    {
      id: 3,
      title: 'Setting 3',
    },
    {
      id: 4,
      title: 'Setting 4',
    },
    {
      id: 5,
      title: 'Setting 5',
    },
    {
      id: 6,
      title: 'Setting 6',
    },
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      settingControl: [],
      dropdownSearch: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.filteredDropdownSearchData = this.form
      .get('dropdownSearch')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterDropdownSearchData(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDropdownSearchData(value: string): Array<DropdownSearchItem> {
    const filterValue = value.toLowerCase();

    return this.dropdownSearchData.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
