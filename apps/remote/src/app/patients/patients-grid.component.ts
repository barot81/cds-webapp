import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { ColumnOption, DataSourceFacade, Filter } from '@zhealthcare/plugin/data-source';
import { zhealthcareTag } from '@zhealthcare/plugin/tags';
import { FullScreenService, PageFacade, ScrollService } from '@zhealthcare/ux';
import { Observable, Subject } from 'rxjs';

import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { PatientFormsService } from '../forms/patient-forms.service';
import { FakePatient } from '../models/fake-patient.model';
import { PatientSerachColInfo } from '../models/patient-search.model';
import { Patient } from '../models/patient.model';
import { ShowMore } from '../models/show-more.model';
import { GridService } from '../services/grid.service';
import { PatientService } from '../services/patient.service';

export interface PeriodicElement {
  name: string;
  address: string;
  email: string;
  phone: string;
  cohort: string;
  status: string;
  actions: string;
  statusClass: string;
}
const ELEMENT_DATA: FakePatient[] = [];
const Patient_Grid_Datasource = 'Patient_Grid_Datasource';

@Component({
  selector: 'zhc-patients-grid',
  templateUrl: './patients-grid.component.html',
  styleUrls: ['./patients-grid.component.scss']
})
export class PatientsGridComponent implements AfterViewInit,OnInit, OnDestroy {
  private settlementHeight = 20;

  clickedRows = new Set<FakePatient>();
  highlightedRows = new Set<FakePatient>();

  tags: Array<zhealthcareTag> = [
    {
      id: Math.random(),
      name: 'Tag Label 1 Bigger Text',
      color: 'indigo-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 2',
      color: 'deep-orange-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 3',
      color: 'pink-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 4 Bigger Text',
      color: 'blue-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 5',
      color: 'gray-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 6',
      color: 'purple-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 7 Bigger Text',
      color: 'yellow-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 8',
      color: 'green-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 9',
      color: 'pink-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 10 Bigger Text',
      color: 'indigo-500',
      isChecked: true,
    },
  ];

  private currentURL = '/admin/patients';
  clicked = '';

  medicineTypes = ['Internal Medicine', 'Family Medicine', 'Sports Medicine'];

  SearchFields = [
    { value: 'Patient Name', id: 1 },
    { value: 'Query Status', id: 2 },
    { value: 'Room Id', id: 3 },
    { value: 'CDS', id: 4 },
    { value: 'MRN', id: 5 },
  ];

  tooltipOptions = {
    contentType: 'template',
    placement: 'top',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  buttonTooltipOptions = {
    contentType: 'string',
    placement: 'top',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  @ViewChild('gridHeader') gridHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [];
  columnInformation: any;
  dataSource = new MatTableDataSource([]);

  filter: Filter[] = [];
  defaultFilters: Filter[];
  showMoreFilters: ShowMore[];
  filterQueryData: Patient;
  filterQuery = '';

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  searchItem = new FormControl();
  searchValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageNumber = 1;
  dataCount = 0;
  isLoadingResults = false;

  private readonly _unsubscribe: Subject<any> = new Subject();

  constructor(
    public dialog: MatDialog,
    public _scrollService: ScrollService,
    public gridService: GridService,
    private elem: ElementRef,
    private readonly _pageFacade: PageFacade,
    private _router: Router,
    public _fullScreenService: FullScreenService,
    public patientService: PatientService,
    public patientFormService: PatientFormsService,
    public datasourceFacade: DataSourceFacade

  ) {
    this._pageFacade.setPageTitle('Patients');
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          await this.setHeaderHeights();
        }
      });
    this.patientService.getPatients().subscribe(x=> this.dataSource = new MatTableDataSource(x));
    this.columnInformation = PatientSerachColInfo;
    this.InitializeDataSource();
  }
  ngOnInit(): void {
    this.initializeDataSourceData();
  }

  private initializeDataSourceData() {
    this.patientService.patientData$
      .pipe(takeUntil(this._unsubscribe),
        map(patients => this.dataSource = new MatTableDataSource(patients)))
      .subscribe();
  }

  private InitializeDataSource() {
    this.setDefaultFilters();
    this.showMoreFilters = new Array<ShowMore>();
    this.datasourceFacade.DataSourceDestroy();

    this.columnInformation = PatientSerachColInfo;
    this.displayedColumns = this.columnInformation
      .filter((x:ColumnOption) => x.isDisplayColumn)
      .map((x:ColumnOption) => x.fieldName);
    this.displayedColumns.push('actions');
  }

  setDefaultFilters() {
    this.defaultFilters = [];
    if (sessionStorage.getItem(Patient_Grid_Datasource)) {
      if (localStorage.getItem('fusionDataSource')) {
        // this.resetFilter();
      }
      const filterSessionData = JSON.parse(
        sessionStorage.getItem(Patient_Grid_Datasource)
      );
      filterSessionData.filters.forEach((element) => {
        if (element?.type === 'search' && element.value !== '') {
          this.searchValue = element.value;
        }
        this.defaultFilters.push(element);
      });
      this.filter = this.defaultFilters;
    } else {
      const filters = {};
      this.filter = this.defaultFilters;
    }
  }
  private async setHeaderHeights() {
    setTimeout(async () => {
      if (
        this.gridHeader &&
        this.gridHeader !== null &&
        this.pagination &&
        this.pagination !== null
      ) {
        // Set New Height to The Content Header
        await this._scrollService.setContentHeaderHeight(
          this.gridHeader.nativeElement.offsetHeight +
            this.pagination.nativeElement.offsetHeight +
            this.settlementHeight
        );
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  //code for onclick single row select and outside table click event
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (this.elem.nativeElement && this.elem.nativeElement !== null) {
      if (
        this.elem.nativeElement.querySelector('#simpleTable') &&
        this.elem.nativeElement.querySelector('#simpleTable') !== null
      ) {
        if (
          !this.elem.nativeElement
            .querySelector('#simpleTable')
            .contains(event.target)
        ) {
          if (this.clickedRows.size) {
            this.highlightedRows = this.clickedRows;
          }
          this.clickedRows = new Set<FakePatient>();
        }
      }
    }
  }

  addRow(row) {
    if (this.clickedRows.size) {
      if (this.clickedRows.has(row)) {
        this.clickedRows = new Set<FakePatient>();
      } else {
        this.clickedRows = new Set<FakePatient>();
        this.clickedRows.add(row);
      }
    } else {
      this.clickedRows.add(row);
    }
    this.highlightedRows = new Set<FakePatient>();
  }

  //chips code
  remove(fruit: string): void {
    const index = this.medicineTypes.indexOf(fruit);

    if (index >= 0) {
      this.medicineTypes.splice(index, 1);
    }
  }
  //chips code end

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
