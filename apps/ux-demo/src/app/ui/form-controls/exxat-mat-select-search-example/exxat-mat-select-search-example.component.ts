import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToggleAllType } from '@exxat/ux';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

class DropdownSearchItem {
  id: number;
  title: string;
}

@Component({
  selector: 'exxat-mat-select-search-example',
  templateUrl: './exxat-mat-select-search-example.component.html',
})
export class ExxatMatSelectSearchExample implements OnInit {
  /** control for the selected for multi-selection */
  public multiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public filterCtrl: FormControl = new FormControl();
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
      title: 'Lorem ipsum',
    },
    {
      id: 5,
      title:
        'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print',
    },
    {
      id: 6,
      title: 'Tomato',
    },
    {
      id: 7,
      title:
        'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print',
    },
  ];

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

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    theme: 'dark',
    'max-width': '300',
    width: '300',
    pointerEvents: 'auto',
  };

  filteredDropdownSearchData: Observable<Array<DropdownSearchItem>>;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  /**
   *
   */
  constructor() {}

  ngOnInit(): void {
    this.filteredDropdownSearchData = this.filterCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDropdownSearchData(value))
    );
  }

  private _filterDropdownSearchData(value: string): Array<DropdownSearchItem> {
    const filterValue = value.toLowerCase();

    return this.dropdownSearchData.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  toggleSelectAll($event: ToggleAllType) {
    this.multiCtrl.patchValue(<any>$event.values);
  }

  // toggleSelectAll(selectAllValue: boolean) {
  //   this.filteredDropdownSearchData
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe((val) => {
  //       if (selectAllValue) {
  //         this.multiCtrl.patchValue(val);
  //       } else {
  //         this.multiCtrl.patchValue([]);
  //       }
  //     });
  // }
}
