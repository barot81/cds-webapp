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
import {
  HeaderService,
  ScrollService
} from '@zhealthcare/ux';
import {
  BehaviorSubject,
  catchError,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
  tap,
  of as observableOf,
  debounce,
  debounceTime,
} from 'rxjs';
import * as moment from "moment";
import { HttpHeaders } from '@angular/common/http';
import { GridService } from '../../services/grid.service';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tenant-list',
  templateUrl: './tenant-list.component.html',
  //   styleUrls: ['./provider-list.component.scss'],
})
export class TenantListComponent implements OnInit, AfterViewInit, OnDestroy {
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
  filterObj = []
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

  @Output() tenantClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dataSourceComponentService: DataSourceComponentService,
    public datasourceFacade: DataSourceFacade,
    private readonly elem: ElementRef,
    public _patientGridService: GridService,
    public _headerService: HeaderService,
    public _scrollService: ScrollService,
    private readonly _fusionNavigationService: FusionNavigationService,
    private readonly userFacade: UserFacade,
    public datepipe: DatePipe,
    public _media: MediaObserver,
    protected metaSandbox: MetaSandbox,
    protected configService: FusionConfigService,
    private _tenantSelectionFilterService:TenantSelectionFilterService
  ) {
    this._unsubscribe = new Subject();
    this.datasourceFacade.DataSourceDestroy();
    this.serviceEndPoint =
      this.configService.getservice('foundation.meta').endpoint;
    this.loggedInUser$ = this.userFacade.UserState$.pipe(
      takeUntil(this._unsubscribe)
    );
    this.columnInformation = TenantListModel;
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
  }
  InitializeDataSource() {
    const dataSource: FusionDataSource = new FusionDataSource();
    dataSource.endPoint = `${this.serviceEndPoint}/Tenant/DetailedInfo`;
    dataSource.customHeaders = [
      { name: 'tenantId', value: 'Base'},
      { name: 'ouCodes', value: '1000'}
    ]
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
      columnName: 'name', //this.defaultSortCoulmn,
      direction: 'asc',
      customFieldParm: {
        sortByFieldName: 'SortByField',
        sortDirectionFieldName: 'OrderBy',
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
     if (this._tenantListDrawerService.reloadFilter) {
      this._tenantListDrawerService.reloadFilter.subscribe((data) => {
        if (data) {
          this.applyFilter();
        }
      });
    }
    this.datasourceFacade.datasourceSerchFilter$
      .pipe(
        debounceTime(300),
        takeUntil(this._unsubscribe))
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
  getNavigations() {
    return this._fusionNavigationService.getNavigationItem('sso.config')[
      'children'
    ];
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
    Logger.trace(
      `StudentModule : SearchComponent => initPagination()=> page set to : ${this.paginator?.pageIndex}`
    );
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
  applyFilter(){
    this.filterObj=[];
    const filtervalues = this._tenantSelectionFilterService.getAppliedFilters();
    if(filtervalues && filtervalues.length > 0){
      this.filterObj = [...filtervalues];
    }
    if( this.filterObj.length > 0){
      this.datasourceFacade.updateAllDataSourceFilter(this.filterObj, 0);
      const searchFilter  = this.filterObj.filter(ele => ele.fieldName === 'SearchString')
      if(searchFilter && searchFilter.length > 0){
        this.searchValue = searchFilter[0].value;
      }
    }


  }

  applySearch(event) {
    const searchValue = this.searchValue?.trim();
    if(searchValue.length > 0){
    const searchFilter = [...this.filterObj];
    if(!(searchFilter.some(ele => ele.fieldName === 'SearchString'))){
      searchFilter.push({
        fieldName: 'SearchString',
        value: searchValue,
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Search Tenant',
      });
    }else {
      const searchIndex = searchFilter.findIndex(ele => ele.fieldName === 'SearchString');
      searchFilter.splice(searchIndex,1,{
        fieldName: 'SearchString',
        value: searchValue,
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Search Tenant',
      });
      }
    this.filterObj = [...searchFilter];
    this.datasourceFacade.updateAllDataSourceFilter(this.filterObj, 0);
    this._tenantSelectionFilterService.setAppliedFilters(this.filterObj);
    }
    if(searchValue.length === 0){
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchValue = '';
    const searchFilter  = this.filterObj.filter(ele => ele.fieldName !== 'SearchString')
  this.filterObj = [...searchFilter];
  this.datasourceFacade.updateAllDataSourceFilter(this.filterObj, 0);
    this._tenantSelectionFilterService.setAppliedFilters(this.filterObj);
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
    Logger.trace(
      `StudentModule : SearchComponent => clearFilters()=> all filter cleared`
    );
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
    this.datasourceFacade.updateSerchFilter('fullName', {
      fieldName: 'fullName',
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
  selectTenant(selectedTenantId) {
    this.tenantClick.emit(selectedTenantId);
  }

  convertDateIntoIst(date){
    if(date){
      return moment.utc(date).local().format('D MMM, YYYY h:mm A [IST]');
    }
    return null;
   }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
    this.datasourceFacade.DataSourceDestroy();
  }
}
