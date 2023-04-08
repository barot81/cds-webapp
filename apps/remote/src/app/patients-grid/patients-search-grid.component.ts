import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FusionConfigService, MethodType, UserFacade } from "@zhealthcare/fusion/core";
import { ExcelModel } from "@zhealthcare/fusion/models";
import { ExportExcelService, FeatureMetadataService, FusionNavigationService } from "@zhealthcare/fusion/services";
import { ColumnOption, DataSourceComponentService, DataSourceFacade, DataSourceResponse, DataSourceService, Filter, FusionDataSource, Item, Sort } from "@zhealthcare/plugin/data-source";
import { FileConfiguration, FileEndpoint } from "@zhealthcare/plugin/file-upload";
import { HeaderService, ScrollService } from "@zhealthcare/ux";
import { catchError, debounceTime, distinctUntilChanged, fromEvent, map, merge, Observable, Subject, takeUntil, tap } from "rxjs";
import { EnrollmentCalendar, GraduationCalendar, PatientSerachColInfo } from "../models/patient-search.model";
import { Patient } from "../models/patient.model";
import { ShowMore } from "../models/show-more.model";
import { TagMaster } from "../models/tagmaster.model";
import lodash from 'lodash';
import { PatientDataSource } from "../models/patient-datasource";
import { PatientFormsService } from "../forms/patient-forms.service";
import { FEATURECODE } from "../models/featurecode-rback.model";
import { ProfileAdminLayoutService } from "../services/admin-layout.service";
import { PatientService } from "../services/patient.service";
import { TagMasterService } from "../services/tagmaster.service";


@Component({
  selector: 'patients-search-grid',
  templateUrl: './patients-search-grid.component.html',
  styleUrls: ['./patients-search-grid.component.scss'],
})
export class PatientsSearchGridComponent implements OnInit, AfterViewInit, OnDestroy {
  public feature: FEATURECODE;
  public profileCode: any;

  private readonly _unsubscribe: Subject<any>;
  displayedColumns$: Observable<string[]>;
  data: Patient[] = [];
  tagMaster: Array<TagMaster>;
  fileConfiguration: FileConfiguration;
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
  numberOfAppliedFilter = 0;
  showMoreFilters: ShowMore[];

  columnInformation: ColumnOption[];
  cohorts: Item[] = [];
  tags: Item[] = [];
  invitationStatuses: Item[] = [];
  cohortControl = new FormControl();
  fusionData$;
  searchOptions: ColumnOption[];

  //export to excel
  dataToExport: any[] = [];
  finalDataToExport: ColumnOption[] = [];
  columnToExport: string[] = [];
  fieldAndDisplayName: Map<string, string> = new Map();
  serviceEndPoint: string;
  gridData: any;
  filterSelected: boolean;
  exportInProgress: boolean;
  invitationInProgress: boolean;
  exportGrid: void;
  routerPath: string;

  //search
  currentField: string;
  displayName: string;
  searchText: string;

  //invite student
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


  studentFullName = 'Student Name';
  invitationStatus = 'Account Status';
  hasPublishAccess: boolean;

  //constant
  stickyTable = '#stickyColumnTable';
  columnsToSearch= ['FirstName', 'LastName', 'Email', 'Phone', 'ProfileStatus', 'Campus',
    'Category','GroupName', 'CohortName', 'StudentNumber', 'EnrollmentTerm', 'GraduationTerm'];

  constructor(
    public dataSourceComponentService: DataSourceComponentService,
    public datasourceFacade: DataSourceFacade,
    private readonly elem: ElementRef,
    private readonly fusionConfidService: FusionConfigService,
    private readonly exportExcelService: ExportExcelService,
    private readonly dataSourceService: DataSourceService,
    public _profileFormsService: PatientFormsService,
    private readonly _patientService: PatientService,
    public _headerService: HeaderService,
    public _scrollService: ScrollService,
    private readonly _tagMasterFacade: TagMasterService,
    private readonly _fusionNavigationService: FusionNavigationService,
    private readonly userFacade: UserFacade,
    public datepipe: DatePipe,
    public _media:MediaObserver,
    private readonly featureService: FeatureMetadataService,
    public readonly _profileAdminLayoutService: ProfileAdminLayoutService
  ) {
    // this._lookupSandbox.loadSetupLookups();
    this.showMoreFilters = new Array<ShowMore>();
    this.feature = new FEATURECODE();
    this.profileCode = this.feature.studentFeatureEnrollment;
    this._unsubscribe = new Subject();
    // this.campusLookup = new CampusLookup();
    // // this.categoryLookup = new CategoryLookup();
    // this.enrollmentTermLookup = new EnrollmentTermLookup();
    // this.graduationTermLookup = new GraduationTermLookup();
    this.datasourceFacade.DataSourceDestroy();
    this.fileConfiguration = new FileConfiguration();
    this.fileConfiguration.fileEndpoint = new FileEndpoint(
      'student.profile',
      'student'
    );
    this.serviceEndPoint =
      this.fusionConfidService.getservice('student.profile').endpoint;
    this.loggedInUser$ = this.userFacade.UserState$.pipe(
      takeUntil(this._unsubscribe)
    );
    this.columnInformation = PatientSerachColInfo;

    this.defaultFilters = [];
    //default filter for is active
    this.setDefaultFilter();

    //set the navigation
    const navigationChild = this.getNavigations();
    if (navigationChild) {
      this.routerPath = navigationChild[0].url;
    }


    this.InitializeDataSource();
    this._patientService.onStudentAdded.subscribe((isAdded) => {
      if (isAdded) {
        this.resetFilter();
        this.sortByCreatedTimeStamp();
      }
    });

    this._patientService.onFilterChange.subscribe((change) => {
      if (change) {
        this.initPagination();
      }
    });

    // this._lookupSandbox.campusLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(campus => {
    //   this.campusLookup = campus;
    // });
    // this._lookupSandbox.categoryLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(category => {
    //   this.categoryLookup = category;
    // });
    // this._lookupSandbox.enrollmentTermLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(enroll => {
    //   this.enrollmentTermLookup = enroll;
    // });
    // this._lookupSandbox.graduationTermLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(grad => {
    //   this.graduationTermLookup = grad;
    // });
    // this._cohortFacade.allCohort$
    //   .pipe(takeUntil(this._unsubscribe))
    //   .subscribe((cohortList) => {
    //     const cohortRes: Item[] = [];
    //     cohortList.forEach((cohort) =>
    //       cohortRes.push({ value: cohort.id, viewName: cohort.cohortName })
    //     );
    //     this.cohorts = cohortRes;
    //   });

    this._tagMasterFacade.allTagMaster$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((response) => {
        if (response) {
          this.tagMaster = response;
          const tagRes: Item[] = [];
          response.forEach((tag) =>
            tagRes.push({ value: tag.id, viewName: tag.title })
          );
          this.tags = tagRes;
        }
      });

    this.columnInformation.forEach((x) => {
      this.fieldAndDisplayName.set(x.fieldName, x.displayName);
    });
    this.searchOptions = this.columnInformation.filter((x) => x.isSearchable);
    this.datasourceFacade.fusionDataSource$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((res) => {
        if (res) {
          this.gridData = res;
          this._patientService.profileListLoaded({ result: res?.data, count: res?.total });
        }
      });

    this.clearSelectionOnBulkUpdateComplete();
  }


  InitializeDataSource() {
    const dataSource: FusionDataSource = new FusionDataSource();
    const sort: Sort = {
      columnName: 'lastName',
      direction: 'asc',
    };
    dataSource.endPoint = `${this.serviceEndPoint}/ProfileReport/GetAllProfile`;
    dataSource.filters = this.defaultFilters;
    dataSource.displayColumns = this.columnInformation.filter(
      (x) => x.isDisplayColumn
    );
    dataSource.remainingDisplayColumns = this.columnInformation.filter(
      (x) => x.isRemainingDisplayColumn
    );
    dataSource.sort = sort;
    dataSource.pagination = { startIndex: 0, pageSize: 100 };
    dataSource.requestType = MethodType.POST;
    dataSource.multiColumnSearch = this.columnsToSearch;
    this.datasourceFacade.InitializeDataSource(dataSource);
    // Logger.trace(`StudentModule : SearchComponent => InitializeDataSource()`);
    this.displayedColumns$ =
      this.datasourceFacade.dataSourceDisplayColumns$.pipe(
        map((x) => x.displayColumns.map((y) => y.fieldName))
      );
  }

  ngOnInit(): void {

    this.initializeSearchInput();
    //setup check
    this.featureService.getLookupByName('invitationstatus').subscribe((res) => {
      const invitationStatusRes: Item[] = [];
      res.items.forEach((status) =>
        invitationStatusRes.push({
          value: status.itemId,
          viewName: status.description,
        })
      );
      invitationStatusRes.push({ value: 'processed', viewName: 'In Progress' });
      this.invitationStatuses = invitationStatusRes;
    });

    this.datasourceFacade.datasourceSerchFilter$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((x) => {
        if (x !== undefined && x !== null) {
          this.currentField = x.fieldName;
          this.displayName = x.displayName;
          this.searchText = x.value;
        }
      });

    this.getLatestFusionFilter();

   // Logger.trace(`StudentModule :SearchComponent => ngOnInit() completed`);

  }

  //get navigations
  getNavigations() {
    return this._fusionNavigationService.getNavigationItem('admin.profile')[
      'children'
      ];
  }

  //export to excel
  exportAsXLSX() {
    this.exportInProgress = true;
    this.dataSourceService
      .getEndpoint(`${this.serviceEndPoint}/ProfileReport/GetAllProfile`, false)
      .subscribe((res) => {
        this.dataSourceService
          .getDataSource(res, [], MethodType.POST, false)
          .subscribe((data: DataSourceResponse<any>) => {
            if (data !== undefined && data !== null) {
              this.dataToExport = [];
              this.exportGrid = data?.result?.forEach((element) => {
                this.dataToExport.push(element);
              });
            }
            this.exportInProgress = false;
            this.displayedColumns$.forEach((col) => {
              this.columnToExport = [];
              col.forEach((x) => {
                this.columnToExport.push(x);
              });
            });
            const headerOrders: string[] = [];
            for (const fieldName of this.fieldAndDisplayName.keys()) {
              if (this.columnToExport.includes(fieldName)) {
                if (fieldName === 'lastName') {
                  headerOrders.push(this.studentFullName);
                } else if (
                  fieldName !== 'firstName' &&
                  fieldName !== 'viewAs'
                ) {
                  headerOrders.push(this.fieldAndDisplayName.get(fieldName));
                }
              }
            }
            const dataset = lodash.cloneDeep(this.dataToExport);
            this.createDataSheet(dataset);
            const excelmodel: ExcelModel = {
              sheetName: 'Student',
              sheetData: this.finalDataToExport,
              headerOrder: headerOrders,
            };
            this.exportExcelService.exportAsExcelFile([excelmodel], 'Student');
          });
      });
  }

  createDataSheet(dataToExport: any) {
    try {
      this.finalDataToExport = [];
      dataToExport=this.sortDataSheet(dataToExport);
      this.setRowsOfExcel(dataToExport);
    } catch (error) {
      // Logger.error(
      //   `StudentModule :Error in SearchComponent => createDataSheet() ${error}`
      // );
    }
  }

  sortDataSheet(dataToExport: any){
    dataToExport?.sort(function (a, b) {
      const textA = a.lastName.toUpperCase();
      const textB = b.lastName.toUpperCase();
      if(textA < textB){
        return -1;
      }
      return textA > textB ? 1 : 0;
    });
    return dataToExport;
  }

  setRowsOfExcel(dataToExport: any){
    dataToExport.forEach((item) => {
      const tempObj: any = {};
      for (const prop in item) {
        if (
          this.columnToExport.includes(prop) &&
          this.fieldAndDisplayName.has(prop)
        ) {
          if (prop === 'lastName') {
            tempObj[
              this.studentFullName
              ] = `${item[prop]}, ${item.firstName}`;
          }
          else if(prop === 'enrollmentTerm'){
            tempObj[EnrollmentCalendar] = this.getTerm(item.enrollmentTerm,item.enrollmentTermDate);
          }
          else if(prop === 'graduationTerm'){
            tempObj[GraduationCalendar] = this.getTerm(item.graduationTerm,item.graduationTermDate);
          }
           else{
            const header = this.fieldAndDisplayName.get(prop);
            tempObj[header] = item[prop];
          }
        }
      }
      this.finalDataToExport.push(tempObj);
    });
  }

  getTerm(termName,termDate) {
    if(termName){
    // returns term name with date if present
      return termDate ? `${termName} (${this.datepipe.transform(termDate, 'MMMM d, y')})`: termName;
    }
  }

  getinvitationStatus(item) {
    if (item?.isSSOUser) {
      return 'Activated';
    }
    if (item?.invitationDetails) {
      let description = '';
      description += this.getInvitationStatusDescription(
        item?.invitationDetails?.status
      );
      description +=
        item?.invitationDetails?.status !== 'activated'
          ? ` ${this.datepipe.transform(
            new Date(item?.invitationDetails?.statusTimestamp),
            'MMMM d, y'
          )}`
          : '';
      return description;
    } else {
      return this.getInvitationStatusDescription('notInvited');
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.gridData.data.forEach((item) => {
        this.selection.deselect(item);
        this.selectedRow?.splice(
          this.selectedRow.findIndex((ele) => ele.id === item.id),
          1
        );
      });
    } else {
      this.gridData.data.forEach((row) => {
        if (!this.selectedRow?.find((x) => row.id === x.id)) {
          this.selection.select(row);
          this.selectedRow.push(row);
        }
      });
    }
  }

  isAllSelected() {
    return this.gridData?.data?.every((data) =>
      this.selectedRow?.find((item) => data.id === item.id)
    );
  }
  isCurrentPagePartiallySelected() {
    return this.gridData?.data?.some((data) =>
      this.selectedRow?.find((item) => data.id === item.id)
    );
  }

  childSelectionChange(element) {
    this.selection.toggle(element);
    if (this.selectedRow?.find((x) => element.id === x.id)) {
      this.selectedRow = this.selectedRow?.filter((x) => x.id !== element.id);
    } else {
      this.selectedRow.push(element);
    }
    this.addRow(element)
  }

  isChecked(id) {
    return this.selectedRow?.some((x) => x.id === id);
  }

  clearSelection() {
    this.selection.clear();
    this.selectedRow.splice(0, this.selectedRow.length);
  }

  sortByCreatedTimeStamp() {

    // Logger.trace(
    //   `StudentModule : SearchComponent => sortByCreatedTimeStamp()=> sort by timestamp`
    // );
    this.displayedColumns$ =
      this.datasourceFacade.dataSourceDisplayColumns$.pipe(
        map((x) => x.displayColumns.map((y) => y.fieldName))
      );
    const sort: Sort = {
      columnName: 'createdTimestamp',
      direction: 'desc',
    };
    this.datasourceFacade.LoadDataSource(
      `${this.serviceEndPoint}/ProfileReport/GetAllProfile`,
      this.columnInformation.filter((x) => x.isDisplayColumn),
      [],
      true,
      sort,
      MethodType.POST
    );
    this._patientService.onStudentAdded.next(false);
    this.initPagination();
  }

  initPagination() {
    this.clearSelection();
    if (this.paginator?.pageIndex !== undefined) {
      this.paginator.pageIndex = 0;
    }
    // Logger.trace(
    //   `StudentModule : SearchComponent => initPagination()=> page set to : ${this.paginator?.pageIndex}`
    // );
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.isLoadingResults = true;
          this.datasourceFacade.GetDataSource(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex * this.paginator.pageSize,
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
          return Of([]);
        })
      )
      .subscribe();
  }

  //code for ellipses and tooltip
  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem?.offsetHeight <= elem?.scrollHeight - 2;
    } else {
      return false;
    }
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
        sessionStorage.setItem(
          PatientDataSource.Patient_Grid_Datasource,
          JSON.stringify(x)
        );
        this.setFilterValue();
      });
  }

  setFilterValue() {

    this.numberOfAppliedFilter = 0;
    this.showMoreFilters = [];
    const filteredGridData = this.gridFilter.filter(x => {
      const showFilter = new ShowMore();
      Object.assign(showFilter, x);
      showFilter.filterValue = new Map();
      if (x.fieldName === "cohortId") {
        showFilter?.filterValue?.set(x.value, this.getCohortId(x.value));
      }
      if (x.fieldName === "profileStatus") {
        this.getFilterValue(x.value)?.forEach(y => {
          showFilter?.filterValue?.set(y, y);
        })
      }
      if (x.fieldName === "groupName") {
        this.getFilterValue(x.value)?.forEach(y => {
          showFilter?.filterValue?.set(y, y);
        })
      }
      if (x.fieldName === "graduationTermId") {
        this.getFilterValue(x.value)?.forEach(y => {
          showFilter?.filterValue?.set(y, this.getGraduationTerm(y));
        })
      }
      // if (x.fieldName === "categoryId") {
      //   this.getFilterValue(x.value)?.forEach(y => {
      //     showFilter?.filterValue?.set(y, this.getCategory(y));
      //   })
      // }
      // if (x.fieldName === "campusId") {
      //   this.getFilterValue(x.value)?.forEach(y => {
      //     showFilter?.filterValue?.set(y, this.getCampus(y));
      //   })
      // }
      // if (x.fieldName === "enrollmentTermId") {
      //   this.getFilterValue(x.value)?.forEach(y => {
      //     showFilter?.filterValue?.set(y, this.getEnrollmentTerm(y));
      //   })
      // }
      if (x.fieldName === "tagId") {
        this.getFilterValue(x.value)?.forEach(y => {
          showFilter?.filterValue?.set(y, this.getTagsbyId(y));
        })
      }
      if (x.fieldName === "invitationStatus") {
        this.getFilterValue(x.value)?.forEach(y => {
          showFilter?.filterValue?.set(y, this.getInvitationStatusDescription(y));
        })
      }
      this.showMoreFilters.push(showFilter);

    });
    this.showMoreFilters.map(fil => fil.filterValue)?.forEach((currentValue) => {
      this.numberOfAppliedFilter = this.numberOfAppliedFilter + currentValue.size;
    });
  }
  getGraduationTerm(y: string): any {
    throw new Error("Method not implemented.");
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

  setDefaultFilter() {
    if (sessionStorage.getItem(PatientDataSource.Patient_Grid_Datasource)) {
      if (localStorage.getItem('fusionDataSource')) {
        this.resetFilter();
      }
      const filterSessionData = JSON.parse(
        sessionStorage.getItem(PatientDataSource.Patient_Grid_Datasource)
      );
      filterSessionData.filters.forEach((element) => {
        if (element?.type === 'search' && element.value !== '') {
          this.searchText = element.value;
        }
        this.defaultFilters.push(element);
      });
    } else {
      const activeFilter = this.createFilter({
        fieldName: 'profileStatus',
        value: 'Active',
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Status',
      });
      this.defaultFilters.push(activeFilter);
    }
    // Logger.trace(
    //   `StudentModule : SearchComponent => setDefaultFilter()=> ${this.defaultFilters}`
    // );
  }

  clearFilters(value: string, filterData: Filter) {
    const currValue = filterData.value.trim().split('~');
    const filterValue = currValue.filter((x) => x !== value.trim()).join('~');
    this._patientService.onFilterChange.next(true);
    this.datasourceFacade.updateDataSourceFilter({
      fieldName: filterData.fieldName,
      displayName: filterData.displayName,
      operator: filterData.operator,
      value: filterValue.trim(),
    });
    // Logger.trace(
    //   `StudentModule : SearchComponent => clearFilters()=> all filter cleared`
    // );
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

  initializeSearchInput() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      //, filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(800)

      // provides distinct values.
      , distinctUntilChanged()

      , takeUntil(this._unsubscribe)

      // subscription for response
    ).subscribe((text: string) => {
      this.textChanged(text);
    })
  }

  getCohortId(id: string) {
    if (
      id !== undefined &&
      id !== null &&
      id !== '' &&
      this.cohorts !== undefined &&
      this.cohorts.length > 0
    ) {
      return this.cohorts.find((x) => x.value === id) !== undefined
        ? this.cohorts.find((x) => x.value === id).viewName
        : '';
    } else {
      return null;
    }
  }

  // getCampus(id) {
  //   if (
  //     id !== undefined &&
  //     id !== null &&
  //     id !== '' &&
  //     this.campusLookup?.campuses !== undefined &&
  //     this.campusLookup?.campuses?.length > 0
  //   ) {
  //     return this.campusLookup?.campuses.find((x) => x.id === id) !== undefined
  //       ? this.campusLookup?.campuses.find((x) => x.id === id).name
  //       : '';
  //   } else {
  //     return null;
  //   }
  // }
  // getCategory(id) {
  //   if (
  //     id !== undefined &&
  //     id !== null &&
  //     id !== '' &&
  //     this.categoryLookup?.categories !== undefined &&
  //     this.categoryLookup?.categories?.length > 0
  //   ) {
  //     return this.categoryLookup?.categories.find((x) => x.id === id) !== undefined
  //       ? this.categoryLookup?.categories.find((x) => x.id === id).name
  //       : '';
  //   } else {
  //     return null;
  //   }
  // }
  // getEnrollmentTerm(id) {
  //   if (
  //     id !== undefined &&
  //     id !== null &&
  //     id !== '' &&
  //     this.enrollmentTermLookup?.enrollmentTerms !== undefined &&
  //     this.enrollmentTermLookup?.enrollmentTerms?.length > 0
  //   ) {
  //       const enrollmentTerm = this.enrollmentTermLookup?.enrollmentTerms.find((x) => x.id === id);
  //       if(enrollmentTerm){
  //         return enrollmentTerm.termDate ? `${enrollmentTerm.name} (${this.datepipe.transform(enrollmentTerm.termDate, 'MMMM d, y')})`: enrollmentTerm.name;
  //       }
  //       else{
  //         return '';
  //       }
  //   } else {
  //     return null;
  //   }
  // }

  // getGraduationTerm(id) {
  //   if (
  //     id !== undefined &&
  //     id !== null &&
  //     id !== '' &&
  //     this.graduationTermLookup?.graduationTerms !== undefined &&
  //     this.graduationTermLookup?.graduationTerms?.length > 0
  //   ) {
  //     const graduationTerm = this.graduationTermLookup?.graduationTerms.find((x) => x.id === id);
  //     if(graduationTerm){
  //       return graduationTerm.termDate ? `${graduationTerm.name} (${this.datepipe.transform(graduationTerm.termDate, 'MMMM d, y')})`: graduationTerm.name;
  //     }
  //     else{
  //       return '';
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  getInvitationStatusDescription(itemId: string) {
    if (
      itemId !== undefined &&
      itemId !== null &&
      itemId !== '' &&
      this.invitationStatuses !== undefined &&
      this.invitationStatuses.length > 0
    ) {
      return this.invitationStatuses.find((x) => x.value === itemId) !==
      undefined
        ? this.invitationStatuses.find((x) => x.value === itemId).viewName
        : '';
    } else {
      return null;
    }
  }

  getTagsbyId(id: string) {
    if (
      id !== undefined &&
      id !== null &&
      id !== '' &&
      this.tags !== undefined &&
      this.tags.length > 0
    ) {
      return this.tags.find((x) => x.value === id) !== undefined
        ? this.tags.find((x) => x.value === id).viewName
        : '';
    } else {
      return null;
    }
  }


  // Show in full screen

  clearSelectionOnBulkUpdateComplete() {
    this._patientService.bulkUpdateCompletionStatus$.pipe(takeUntil(this._unsubscribe))
      .subscribe((response: boolean) => {
        if (response) {
          this.clearSelection();
        }
      }, (error) => {
        // Logger.error(`StudentModule : SearchComponent => clearSelectionOnBulkUpdateComplete() ${error}`)
      });
  }


  //code for onclick single row select and outside table click event
  // eslint-disable-next-line @typescript-eslint/member-ordering
  clicked = '';
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


  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
    this.datasourceFacade.DataSourceDestroy();
  }
}
function Of(arg0: undefined[]): any {
  throw new Error("Function not implemented.");
}

