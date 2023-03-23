import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DataSourceFacade } from '../../store/facades/datasource.facade';
import { ColumnOption } from '../../models/response.model';
import { map, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SearchDirective } from '@exxat/ux';

@Component({
  selector: 'exxat-search-bar',
  templateUrl: './exxat-search-bar.component.html'
})
export class ExxatSearchBarComponent implements OnInit, OnDestroy {
  private readonly _unsubscribe: Subject<any>;
  @ViewChild(SearchDirective) _searchDirective;
  searchText = new FormControl();
  currentField: string;
  previousField: string;
  displayName: string;
  @Input() listofOptions: ColumnOption[];
  @Input() integrateFacade: boolean = true;
  @Output() messageToEmit = new EventEmitter<boolean>();
  @Output() onClearClick: EventEmitter<any> = new EventEmitter();
  @Output() searchedValues: EventEmitter<any> = new EventEmitter();

  constructor(private dataSourceFacade: DataSourceFacade) {
    this._unsubscribe = new Subject();
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

  ngOnInit() {
    if (this.integrateFacade) {
      this.dataSourceFacade.datasourceSerchFilter$
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((x) => {
          if (x === undefined || x === null) {
            this.currentField = this.listofOptions[0].fieldName;
            this.displayName = this.listofOptions[0].displayName;
          } else {
            this.currentField = x.fieldName;
            this.displayName = x.displayName;
            this.searchText.patchValue(x.value);
          }
        });
    } else {
      this.currentField = this.listofOptions[0].fieldName;
      this.displayName = this.listofOptions[0].displayName;
    }
  }

  ngOnChanges() {
    this.searchText.reset();
    if (this._searchDirective && this._searchDirective !== null) {
      this._searchDirective.clearVisible.next(false);
    }
  }

  onSelectionChange($event) {
    this.previousField = this.currentField;
    this.currentField = $event.value;
    this.displayName = this.listofOptions.find(
      (x) => x.fieldName == $event.value
    ).displayName;

    if (
      this.searchText &&
      this.searchText !== null &&
      this.searchText.value !== '' &&
      this.searchText.value !== null
    ) {
      this.searchText.reset();
      this._searchDirective.clearVisible.next(false);
      if (this.integrateFacade) this.updateSearchFilterInFacade();
    }
    this.emitFilterValues();
  }

  textChanged() {
    if (this.integrateFacade) this.updateSearchFilterInFacade();
    this.sendMessageToParent(true);
    this.emitFilterValues();
  }

  private updateSearchFilterInFacade() {
    this.dataSourceFacade.updateSerchFilter(this.previousField, {
      fieldName: this.currentField,
      operator: 'contains',
      value: this.searchText.value ? this.searchText.value : '',
      type: 'search',
      displayName: this.displayName
    });
  }

  sendMessageToParent(value) {
    this.messageToEmit.emit(value);
  }

  clearClick() {
    this.onClearClick.emit('Clear Button Clicked');
    this.searchText.reset();
    this.emitFilterValues();
    if (this.integrateFacade) {
      this.dataSourceFacade.updateSerchFilter(this.currentField, {
        fieldName: this.currentField,
        operator: 'contains',
        value: '',
        type: 'search'
      });
    }
  }

  emitFilterValues() {
    this.searchedValues.emit({
      selectedOption: this.currentField,
      searchText: this.searchText.value ?? ''
    });
  }
}
