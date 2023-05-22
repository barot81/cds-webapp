import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  FusionConfigService,
  Logger,
  MethodType,
  UserFacade,
} from '@zhealthcare/fusion/core';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import {
  ColumnOption,
  DataSourceComponentService,
  DataSourceFacade,
  Filter,
  FusionDataSource,
  Sort,
} from '@zhealthcare/plugin/data-source';
import { HeaderService, ScrollService } from '@zhealthcare/ux';
import {
  catchError,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
  tap,
  of as observableOf,
  debounceTime,
} from 'rxjs';
import * as moment from 'moment';
import { GridService } from '../../services/grid.service';
import { PatientGridColInfo } from '../../configs/column-info.config';
import { PatientService } from '../../services/patient.service';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'zhc-patient-grid',
  templateUrl: './patient-grid.component.html',
  //   styleUrls: ['./provider-list.component.scss'],
})
export class PatientGridComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _unsubscribe: Subject<any>;
  displayedColumns$: Observable<string[]>;
  isLoadingResults = true;
  loggedInUser$: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('text_Container', { static: false }) textContainerRef: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;
  @ViewChild('profileSearchHeader') profileSearchHeader: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  clickedRows = new Set<ColumnOption>();
  highlightedRows = new Set<ColumnOption>();
  textContainerElement: Element;
  defaultFilters: Filter[];
  gridFilter: Filter[] = [];
  filterObj = [];
  numberOfAppliedFilter = 0;
  columnInformation: ColumnOption[];
  fusionData$;
  searchOptions: ColumnOption[];
  itemsPerPage = 10;
  fieldAndDisplayName: Map<string, string> = new Map();
  serviceEndPoint: string;
  gridData: any;
  routerPath: string;
  currentField: string;
  displayName: string;
  searchValue: string;
  searchItem = new FormControl();
  selection = new SelectionModel<Element>(true, []);
  selectedRow = [];
  tooltipOptions = {
    contentType: 'string',
    placement: 'top',
    trigger: 'hover',
    'max-width': '200',
    width: 'auto',
    pointerEvents: 'auto',
  };
  stickyTable = '#stickyColumnTable';
  columnsToSearch = ['name', 'tenantId', 'region', 'timeZone', 'location'];

  @Output() patientClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dataSourceComponentService: DataSourceComponentService,
    public datasourceFacade: DataSourceFacade,
    private readonly elem: ElementRef,
    public _patientGridService: GridService,
    public _headerService: HeaderService,
    public _scrollService: ScrollService,
    private readonly _fusionNavigationService: FusionNavigationService,
    private readonly _patientService: PatientService,
    private readonly userFacade: UserFacade,
    public datepipe: DatePipe,
    public _media: MediaObserver,
    protected configService: FusionConfigService
  ) {
    this._unsubscribe = new Subject();
    this.datasourceFacade.DataSourceDestroy();
    this.serviceEndPoint = this._patientService.getDatasourceBaseEndpoint();
    this.loggedInUser$ = this.userFacade.UserState$.pipe(
      takeUntil(this._unsubscribe)
    );
    this.columnInformation = PatientGridColInfo;
    this.defaultFilters = [];
    this.InitializeDataSource();
    this.applyFilter();
    this.columnInformation.forEach((x) => {
      this.fieldAndDisplayName.set(x.fieldName, x.displayName);
    });
    this.searchOptions = this.columnInformation.filter((x) => x.isSearchable);
    this.datasourceFacade.fusionDataSource$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((res) => {
        if (res) {
          this.gridData = res;
        }
      });
  }2
  InitializeDataSource() {
    const dataSource: FusionDataSource = new FusionDataSource();
    dataSource.endPoint = this.serviceEndPoint;
    dataSource.filters = this.defaultFilters;
    dataSource.displayColumns = this.columnInformation.filter(
      (x) => x.isDisplayColumn
    );
    dataSource.remainingDisplayColumns = this.columnInformation.filter(
      (x) => x.isRemainingDisplayColumn
    );
    dataSource.filterQueryparmByFieldName = true;
    dataSource.pagination = {
      startIndex: 0,
      pageSize: this.itemsPerPage,
      customFieldParm: {
        pageSizeFieldName: 'PageSize',
        startIndexFieldName: 'Start',
      },
    };
    const sort: Sort = {
      columnName: 'firstName', //this.defaultSortCoulmn,
      direction: '1',
      customFieldParm: {
        sortByFieldName: 'SortBy',
        sortDirectionFieldName: 'Order',
      },
    };
    dataSource.sort = sort;
    dataSource.requestType = MethodType.GET;
    dataSource.multiColumnSearch = this.columnsToSearch;
    this.datasourceFacade.InitializeDataSource(dataSource);
    Logger.trace(
      `ProviderListModule : ProviderListComponent => InitializeDataSource()`
    );
    this.displayedColumns$ =
      this.datasourceFacade.dataSourceDisplayColumns$.pipe(
        map((x) => x.displayColumns.map((y) => y.fieldName))
      );
  }

  ngOnInit() {
    if (this._patientGridService.reloadFilter) {
      this._patientGridService.reloadFilter.subscribe((data) => {
        if (data) {
          this.applyFilter();
        }
      });
    }
    this.datasourceFacade.datasourceSerchFilter$
      .pipe(debounceTime(300), takeUntil(this._unsubscribe))
      .subscribe((x) => {
        if (x !== undefined && x !== null) {
          this.currentField = x.fieldName;
          this.displayName = x.displayName;
          this.searchValue = x.value;
        }
      });
    // this.getLatestFusionFilter();
    Logger.trace(
      `TenantListModule :TenantListComponent => ngOnInit() completed`
    );
  }

  isChecked(id) {
    return this.selectedRow?.some((x) => x.id === id);
  }

  clearSelection() {
    this.selection.clear();
    this.selectedRow.splice(0, this.selectedRow.length);
  }

  initPagination() {
    this.clearSelection();
    if (this.paginator?.pageIndex !== undefined) {
      this.paginator.pageIndex = 0;
    }
  }

  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort?.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.isLoadingResults = true;
          const page = this.paginator.pageIndex;
          this.datasourceFacade.GetDataSource(
            this.sort.active,
            this.sort.direction == 'asc' ? '1' : '-1',
            page,
            this.paginator.pageSize
          );
          return null;
        }),
        map(() => {
          this.isLoadingResults = false;
          return null;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe();
  }

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem?.offsetHeight <= elem?.scrollHeight - 2;
    } else {
      return false;
    }
  }
  applyFilter() {
    this.filterObj = [];
    const filtervalues = this._patientGridService.getAppliedFilters();
    if (filtervalues && filtervalues.length > 0) {
      this.filterObj = [...filtervalues];
    }
    if (this.filterObj.length > 0) {
      this.datasourceFacade.updateAllDataSourceFilter(this.filterObj, 0);
      const searchFilter = this.filterObj.filter(
        (ele) => ele.fieldName === 'SearchQuery'
      );
      if (searchFilter && searchFilter.length > 0) {
        this.searchValue = searchFilter[0].value;
      }
    }
  }

  applySearch(event) {
    const searchValue = this.searchValue?.trim();
    if (searchValue.length > 0) {
      const searchFilter = [...this.filterObj];
      if (!searchFilter.some((ele) => ele.fieldName === 'SearchQuery')) {
        searchFilter.push({
          fieldName: 'SearchQuery',
          value: searchValue,
          operator: 'Equals',
          type: 'dropdown',
          displayName: 'Search Patient',
        });
      } else {
        const searchIndex = searchFilter.findIndex(
          (ele) => ele.fieldName === 'SearchQuery'
        );
        searchFilter.splice(searchIndex, 1, {
          fieldName: 'SearchQuery',
          value: searchValue,
          operator: 'Equals',
          type: 'dropdown',
          displayName: 'Search Patient',
        });
      }
      this.filterObj = [...searchFilter];
      this.datasourceFacade.updateAllDataSourceFilter(this.filterObj, 0);
      this._patientGridService.setAppliedFilters(this.filterObj);
    }
    if (searchValue.length === 0) {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchValue = '';
    const searchFilter = this.filterObj.filter(
      (ele) => ele.fieldName !== 'SearchQuery'
    );
    this.filterObj = [...searchFilter];
    this.datasourceFacade.updateAllDataSourceFilter(this.filterObj, 0);
    this._patientGridService.setAppliedFilters(this.filterObj);
  }

  getLatestFusionFilter() {
    this.datasourceFacade.fusionDataSource$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((x) => {
        if (x !== undefined && x !== null && x.filters?.length === 0) {
          this.gridFilter = [];
        }
        if (x !== undefined && x !== null && x.filters?.length > 0) {
          this.gridFilter = x.filters.filter(
            (y) => y.type !== 'search' && y.value.trim() !== ''
          );
        }
      });
  }

  getFilterValue(value: string) {
    return value.split('~');
  }

  createFilter(filter: Filter) {
    if (filter !== undefined && filter.fieldName !== undefined) {
      return filter;
    }
    return null;
  }

  clearFilters(value: string, filterData: Filter) {
    const currValue = filterData.value.trim().split('~');
    const filterValue = currValue.filter((x) => x !== value.trim()).join('~');
    this.datasourceFacade.updateDataSourceFilter({
      fieldName: filterData.fieldName,
      displayName: filterData.displayName,
      operator: filterData.operator,
      value: filterValue.trim(),
    });
  }

  resetFilter() {
    this.datasourceFacade.updateSerchFilter(this.currentField, {
      fieldName: this.currentField,
      operator: 'contains',
      value: '',
      type: 'search',
      displayName: this.displayName,
    });
    this.gridFilter = [];
    this.datasourceFacade.updateAllDataSourceFilter(this.gridFilter);
  }

  textChanged(textValue) {
    this.datasourceFacade.updateSerchFilter('name', {
      fieldName: 'name',
      operator: 'contains',
      value: textValue,
      type: 'search',
    });
    this.initPagination();
  }

  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (this.elem.nativeElement && this.elem.nativeElement !== null) {
      if (
        this.elem.nativeElement.querySelector(this.stickyTable) &&
        this.elem.nativeElement.querySelector(this.stickyTable) !== null
      ) {
        if (
          !this.elem.nativeElement
            .querySelector(this.stickyTable)
            .contains(event.target)
        ) {
          if (this.clickedRows.size) {
            this.highlightedRows = this.clickedRows;
          }
          this.clickedRows = new Set<ColumnOption>();
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  scrollPointer = 0;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    this.scrollPointer = (event.target as HTMLElement).scrollLeft;
  }

  addRow(row) {
    if (this.clickedRows.size) {
      if (this.clickedRows.has(row)) {
        this.clickedRows = new Set<ColumnOption>();
      } else {
        this.clickedRows = new Set<ColumnOption>();
        this.clickedRows.add(row);
      }
    } else {
      this.clickedRows.add(row);
    }
    this.highlightedRows = new Set<ColumnOption>();
  }
  selectPatient(selectedPatientId) {
    this.patientClick.emit(selectedPatientId);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
    this.datasourceFacade.DataSourceDestroy();
  }
}
