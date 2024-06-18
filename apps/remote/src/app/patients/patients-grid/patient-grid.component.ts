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
import {
  ColumnOption,
  DataSourceComponentService,
  DataSourceFacade,
  Filter,
  FusionDataSource,
  Sort,
} from '@zhealthcare/plugin/data-source';
import { FuseProgressBarService, HeaderService, PageFacade, ScrollService } from '@zhealthcare/ux';
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
  filter,
  pairwise,
  lastValueFrom,
} from 'rxjs';
import { GridService } from '../../services/grid.service';
import { PatientGridColInfo } from '../../configs/column-info.config';
import { PatientService } from '../../services/patient.service';
import { Router, RoutesRecognized } from '@angular/router';
import { GeneralComment } from '../../models/general-comments.model';
import { MatTableExporterDirective } from 'mat-table-exporter';
import * as moment from 'moment';
import { ExportPDFHelper } from './export-pdf.helper';

export class AppliedGridFilter {
  constructor(public name: string, public values: string[]) {}
}
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'zhc-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.scss'],
})
export class PatientGridComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _unsubscribe: Subject<any>;
  displayedColumns$: Observable<string[]>;
  isLoadingResults = false;
  loggedInUser$: Observable<any>;
  exportInProgress = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('text_Container', { static: false }) textContainerRef: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;
  @ViewChild('patientSearchHeader') patientSearchHeader: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  clickedRows = new Set<ColumnOption>();
  highlightedRows = new Set<ColumnOption>();
  textContainerElement: Element;
  defaultFilters: Filter[];
  gridFilter: AppliedGridFilter[] = [];
  filterObj = [];
  numberOfAppliedFilter = 0;
  columnInformation: ColumnOption[];
  fusionData$;
  searchOptions: ColumnOption[];
  itemsPerPage = 20;
  fieldAndDisplayName: Map<string, string> = new Map();
  serviceEndPoint: string;
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
  columnsToSearch = [
    'patientName',
    'patientNo',
    'mrn',
    'room',
    'reimbursementType'
  ];
  colorBadges = {
    'No Query': 'noquery',
    'Non DRG': 'nondrg',
    New: 'inprogress',
    'Later Review': 'pendingreview',
    'Pending Query': 'notapproved',
    Reviewed: 'reviewed',
  };

  fieldDisplayNameMapping = {
    'Filters.ReviewStatus': 'Review Status',
    'Filters.QueryStatus': 'query status',
    'Filters.AdmitStartDate': 'Admit Date',
  };
  @Output() patientClick: EventEmitter<any> = new EventEmitter<any>();
  appliedFilters: Filter[];
  selectedSortingOption: string;
  displayedComments = 2;
  showMoreText = 'Show more';
  @ViewChild('table', {static: true}) table!: ElementRef;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  sortingOptions = [
    { label: 'Room (Ascending)', value: 'room-asc' },
    { label: 'Room (Descending)', value: 'room-desc' },
    { label: 'Name (Ascending)', value: 'patientName-asc' },
    { label: 'Name (Descending)', value: 'patientName-desc' },
    { label: 'Admit Date (Oldest First)', value: 'admitDate-asc' },
    { label: 'Admit Date (Newest First)', value: 'admitDate-desc' },
  ];
  exportToPdfOptions = [
    { label: 'With Followup comments', value: 'WithComments' },
    { label: 'Without Followup comments', value: 'NoComments' }
  ];
  selectedExportOption = "NoComments";
  constructor(
    public dataSourceComponentService: DataSourceComponentService,
    public datasourceFacade: DataSourceFacade,
    private readonly elem: ElementRef,
    public _patientGridService: GridService,
    public _headerService: HeaderService,
    public _scrollService: ScrollService,
    private readonly _patientService: PatientService,
    private readonly userFacade: UserFacade,
    public datepipe: DatePipe,
    public _media: MediaObserver,
    protected configService: FusionConfigService,
    public router: Router,
    private fuseProgressBarService: FuseProgressBarService,
    private pageFacade: PageFacade
  ) {
    this.pageFacade.setPageTitle('360\xB0 MD CDI');
    this.fuseProgressBarService.hide();
    this._unsubscribe = new Subject();
    this.datasourceFacade.DataSourceDestroy();
    this.serviceEndPoint = this._patientService.getBaseEndpoint();
    this.loggedInUser$ = this.userFacade.UserState$.pipe(
      takeUntil(this._unsubscribe)
    );
    this.ifLaunchpageResetFilter();
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
          this.numberOfAppliedFilter = res.filters.length;
        }
      });
  }

  ifLaunchpageResetFilter() {
    this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise()
    )
    .subscribe((event: any[]) => {
      if (event[0].urlAfterRedirects.includes('launch')) {
        this._patientGridService.resetAppliedFilters();
      }
    });
  }

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
      columnName: 'room', //this.defaultSortCoulmn,
      direction: '1',
      customFieldParm: {
        sortByFieldName: 'SortBy',
        sortDirectionFieldName: 'Order',
      },
    };
    dataSource.sort = sort;
    dataSource.requestType = MethodType.GET;
    dataSource.multiColumnSearch = this.columnsToSearch;
    const selectedStatus = localStorage.getItem('selectedStatus');
    if(selectedStatus) {
      const defaultFilter: Filter = {
        fieldName: 'Filters.ReviewStatus',
        operator: 'eq',
        value: selectedStatus === 'New DRG' ? 'New' : selectedStatus,
        displayName: 'Review Status',
      };
      dataSource.filters = [defaultFilter];
    }
    dataSource.customHeaders = [];
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
    this.getLatestFusionFilter();
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

  applySorting() {
    const sortOption = this.selectedSortingOption.split('-');
    this.datasourceFacade.GetDataSource(
      sortOption[0],
      sortOption[1] == 'asc' ? '1' : '-1',
      1,
      this.paginator.pageSize
    );
  }

  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.paginator.page)
      .pipe(
        tap(() => {
          this.isLoadingResults = true;
          const page = this.paginator.pageIndex;
          this.datasourceFacade.GetDataSource(
            this.sort.active,
            this.sort.direction == 'asc' ? '1' : '-1',
            page * this.paginator.pageSize + 1,
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
          operator: 'contains',
          type: 'search',
          displayName: 'Search Patient',
        });
      } else {
        const searchIndex = searchFilter.findIndex(
          (ele) => ele.fieldName === 'SearchQuery'
        );
        searchFilter.splice(searchIndex, 1, {
          fieldName: 'SearchQuery',
          value: searchValue,
          operator: 'contains',
          type: 'search',
          displayName: 'Search Patient',
        });
      }
      this.filterObj = [...searchFilter];
      this.datasourceFacade.updateSerchFilter(
        'SearchQuery',
        this.filterObj.find(x => x.type === 'search'),
        20
      );
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
    this.datasourceFacade.updateSerchFilter(
      'SearchQuery',
      searchFilter.find((x) => (x.type = 'search')),
      20
    );
    this._patientGridService.setAppliedFilters(this.filterObj);
  }

  getLatestFusionFilter() {
    this.datasourceFacade.fusionDataSource$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((x) => {
        if (x?.filters) {
          if (x.filters.length === 0) this.gridFilter = [];
          else if (x.filters.length > 0) {
            this.appliedFilters = x.filters;
            this.setGridFilterDisplay(x);
          }
        }
      });
  }

  private setGridFilterDisplay(x: FusionDataSource) {
    this.gridFilter = [];
    const currentFilters = x.filters.filter(
      (y) => y.type !== 'search' && y.value.trim() !== ''
    );
    currentFilters.forEach((x) => {
      const filter = this.gridFilter.find((y) => y.name === x.displayName);
      if (filter) {
        if (!filter.values.includes(x.value)) filter.values.push(x.value);
      } else if (x.displayName === 'admitStartDate') {
        this.gridFilter.push(new AppliedGridFilter('Admit Date', [x.value]));
      } else if (x.displayName === 'admitEndDate') {
        const filter = this.gridFilter.find((y) => y.name === 'Admit Date');
        const startDate = filter.values[0];
        filter.values.splice(0, 1, `${startDate}-${x.value}`);
      } else {
        this.gridFilter.push(new AppliedGridFilter(x.displayName, [x.value]));
      }
    });
  }

  createFilter(filter: Filter) {
    if (filter !== undefined && filter.fieldName !== undefined) {
      return filter;
    }
    return null;
  }

  clearFilters(value: string, filter: AppliedGridFilter) {
    let remainingFilters;
    if (filter.name === 'Admit Date') {
      const values = value.split('-');
      remainingFilters = this.appliedFilters.filter(
        (x) => !values.includes(x.value)
      );
    } else {
      remainingFilters = this.appliedFilters.filter(
        (x) => x.value !== value || x.displayName !== filter.name
      );
      if (value === localStorage.getItem('selectedStatus'))
        localStorage.removeItem('selectedStatus');
    }
    this._patientGridService.removeFilter(value, filter.name);
    this.datasourceFacade.updateAllDataSourceFilter(remainingFilters);
  }

  sortedFollowupComments(comments: GeneralComment[]): GeneralComment[] {
    return comments ? [...comments].sort((a, b) => new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime()) : [];
  }

  toggleShowMore(comments: GeneralComment[]) {
    this.displayedComments = this.displayedComments === 2 ? comments.length : 2;
    this.showMoreText = this.displayedComments === 2 ? 'Show more' : 'Show less';
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
    this.datasourceFacade.updateAllDataSourceFilter([]);
  }

  textChanged(textValue) {
    this.datasourceFacade.updateSerchFilter('SearchQuery', {
      fieldName: 'SearchQuery',
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



  async exportAsPDF() {
    this.startShowingLoader();
    await this.generatePDF();
    this.stopShowingLoader();
  }

  private startShowingLoader() {
    this.isLoadingResults = true;
  }

  private stopShowingLoader() {
    this.isLoadingResults = false;
  }

  private async generatePDF() {
    const pdfData = await this.getAllPatientsData();
    pdfData.result = pdfData.result.map(x => {
      const momentDate = moment(x.admitDate);
      x.admitDate =  momentDate.format('MMM DD, YYYY');
      x.followupComments = x.followupComments.filter(y=> y.comments).map(y=> {
        const commentsDate = y.addedOn ? moment(y.addedOn) : "";
        y.addedOn = commentsDate ? commentsDate.format('MMM DD, YYYY') : "";
        return y;
      });
      return x;
    });
    ExportPDFHelper.generatePDF(pdfData, this.selectedExportOption);
  }

  private async getAllPatientsData(): Promise<any>  {
    let sortBy = 'room';
    let sortOrder = '1';
    if(this.selectedSortingOption) {
      const sortOption =this.selectedSortingOption.split("-");
      sortBy = sortOption[0];
      sortOrder = sortOption[1] == 'asc' ? '1' : '-1';
    }
    let endpoint = `${this.serviceEndPoint}?SortBy=${sortBy}&Order=${sortOrder}&Start=0&PageSize=100000`;
    if(this.appliedFilters) {
      this.appliedFilters.forEach(e => {
        endpoint +=`&${e.fieldName}=${e.value}`;
      });
    }
    return await lastValueFrom(this._patientService.getPatientsDataForPDF(endpoint));
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
    this.datasourceFacade.DataSourceDestroy();
  }

}
