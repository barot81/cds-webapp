/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToggleAllType } from '@exxat/ux';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

enum ViewType {
  'CONTROL' = 0,
  'CODE' = 1,
}
interface ControlItem {
  id: string;
  view: ViewType;
}

interface SettingItem {
  title: string;
  color: string;
}

export class DropdownSearchItem {
  id: number;
  title: string;
}

@Component({
  selector: 'drop-down-list',
  templateUrl: './drop-down-list-page.component.html',
  styleUrls: ['drop-down-list-page.component.scss'],
})
export class DropDownListPageComponent implements OnInit {
  _simpleFormControl = new FormControl('', Validators.required);
  _multiFormControl = new FormControl('', Validators.required);
  _settingFormControl = new FormControl('', Validators.required);
  _tooltipHoverFormControl = new FormControl('', Validators.required);
  _nestedFormControl = new FormControl('', Validators.required);
  _searchFormControl = new FormControl('', Validators.required);
  _multiSearchFormControl = new FormControl('', Validators.required);
  _multiFilterFormControl = new FormControl('', Validators.required);
  _categoryFormControl = new FormControl('', Validators.required);

  public _viewType = ViewType;

  _controlList: Array<ControlItem> = [
    { id: 'simple_dropdown', view: ViewType.CONTROL },
    { id: 'checkbox_dropdown', view: ViewType.CONTROL },
    { id: 'settings_dropdown', view: ViewType.CONTROL },
    { id: 'tooltip_on_hover_dropdown', view: ViewType.CONTROL },
    { id: 'nested_list_dropdown', view: ViewType.CONTROL },
    { id: 'search_dropdown', view: ViewType.CONTROL },
    { id: 'multi_select_search_dropdown', view: ViewType.CONTROL },
    { id: 'select_with_footer_dropdown', view: ViewType.CONTROL },
  ];

  toppingList: string[] = [
    'Extra cheese ',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    theme: 'light',
    'max-width': '300',
    width: '300',
    pointerEvents: 'auto',
  };

  // Dropdown With Search Data
  dropdownSearchData: Array<DropdownSearchItem> = [
    {
      id: 1,
      title: 'Extra cheese',
    },
    {
      id: 2,
      title: 'Mushroom',
    },
    {
      id: 3,
      title: 'Onion',
    },
    {
      id: 4,
      title: 'Pepperoni',
    },
    {
      id: 5,
      title: 'Sausage',
    },
    {
      id: 6,
      title: 'Tomato',
    },
  ];

  // Category List Data

  categoryListData = [
    {
      id: 1,
      title: 'Health & Immunization',
    },
    {
      id: 2,
      title: 'Insurance & Liability Coverage',
    },
    {
      id: 3,
      title: 'Membership & Licensure',
    },
    {
      id: 4,
      title: 'Attestations & Acknowledgements',
    },
    {
      id: 5,
      title: 'Certifications & Trainings',
    },
    {
      id: 6,
      title: 'Verification / Identity Documents',
    },
    {
      id: 7,
      title: 'Additional Documents',
    },
    {
      id: 8,
      title: 'Annual Physical',
    },
    {
      id: 9,
      title: 'Covid-19 Test',
    },
    {
      id: 10,
      title: 'Covid-19 Vaccination',
    },
  ];

  // Dropdown With Search Data
  multiSearchData: Array<DropdownSearchItem> = [
    {
      id: 1,
      title: 'Extra cheese',
    },
    {
      id: 2,
      title: 'Mushroom',
    },
    {
      id: 3,
      title: 'Onion',
    },
    {
      id: 4,
      title: 'Lorem ipsum, or lipsum as it is sometimes known',
    },
    {
      id: 5,
      title: 'Sausage',
    },
    {
      id: 6,
      title: 'Lorem ipsum, or lipsum as it is sometimes known',
    },
  ];

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  filteredDropdownSearchData: Observable<Array<DropdownSearchItem>>;

  filteredMultiSearchData: Observable<Array<DropdownSearchItem>>;

  selectedYears: any[];

  years: any[];

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  _list = [
    { value: 'usc', viewValue: 'USC' },
    { value: 'losrios', viewValue: 'LosRios' },
  ];

  settingList: Array<SettingItem> = [
    { title: 'General Rehab Outpatient', color: 'orange' },
    { title: 'OP-Vestibular', color: 'orange-peel' },
    { title: 'Nursing Facility', color: 'tapestry' },
    { title: 'Sports Res', color: 'keppel' },
    { title: 'IP - Pediatrics', color: 'tall-poppy' },
    { title: 'SNF/Sub-Acute/Acute Long-Term Care', color: 'robin-egg-blue' },
    { title: 'Outpatient Hands', color: 'persian-green' },
    { title: 'Inpatient Acute', color: 'dodger-blue-dark' },
    { title: 'College Health Services', color: 'bay-leaf' },
    { title: 'Mobile Health Care', color: 'mandy' },
    { title: 'Home Health', color: 'silver-chalice-dark' },
    { title: 'Behavioral Health Community', color: 'amaranth' },
  ];

  optionsList: string[] = [
    'Lorem ipsum',
    'Lorem ipsum, or lipsum as it is sometimes known',
    'Lorem ipsum',
    'Lorem ipsum, or lipsum as it is sometimes known',
    'Lorem ipsum',
    'Lorem ipsum, or lipsum as it is sometimes known',
  ];

  selectedSettings = new BehaviorSubject<Array<SettingItem>>(
    new Array<SettingItem>()
  );

  selectedSettings$ = this.selectedSettings.asObservable();

  //code for tooltip occours when ellipses occours
  isOptionTruncated(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      const isBig = elem.scrollWidth > elem.clientWidth;
      if (isBig) {
        const optionText = Array.from(
          elem.getElementsByClassName(
            'mat-option-text '
          ) as HTMLCollectionOf<HTMLElement>
        );
        optionText[0].style.overflow = 'hidden !important';
        optionText[0].style.textOverflow = 'ellipsis !important';
        optionText[0].style.display = 'initial !important';
      }
      return isBig;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.years = [
      { id: 1, viewValue: 'Child 1' },
      { id: 2, viewValue: 'Child 2' },
    ];

    this.filteredDropdownSearchData = this._searchFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDropdownSearchData(value))
    );

    this.filteredMultiSearchData =
      this._multiFilterFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterMultiSearchData(value))
      );

    this._settingFormControl.valueChanges.subscribe((data) => {
      if (data && data !== null) {
        this.selectedSettings.next(<any>data);
      }
    });
  }

  private _filterDropdownSearchData(value: string): Array<DropdownSearchItem> {
    const filterValue = value.toLowerCase();

    return this.dropdownSearchData.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  private _filterMultiSearchData(value: string): Array<DropdownSearchItem> {
    const filterValue = value.toLowerCase();

    return this.multiSearchData.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  toggleSelectAll($event: ToggleAllType) {
    this._multiSearchFormControl.patchValue(<any>$event.values);
  }

  public _toggleView(_id: string): void {
    if (_id && _id !== null && _id.length > 0) {
      const _selectedControl: ControlItem = this._controlList.find(
        (x) => x.id.toLowerCase().trim() === _id.toLowerCase().trim()
      );
      if (_selectedControl && _selectedControl !== null) {
        _selectedControl.view =
          _selectedControl.view === ViewType.CONTROL
            ? ViewType.CODE
            : ViewType.CONTROL;
      }
    }
  }

  public _getViewType(_id: string): ViewType {
    return this._controlList.find((x) => x.id === _id).view;
  }
}
