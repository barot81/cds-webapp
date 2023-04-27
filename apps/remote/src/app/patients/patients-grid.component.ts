import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { zhealthcareTag } from '@zhealthcare/plugin/tags';
import { FullScreenService, ScrollService } from '@zhealthcare/ux';

import { filter, tap } from 'rxjs/operators';
import { PatientFormsService } from '../forms/patient-forms.service';
import { FakePatient } from '../models/fake-patient.model';
import { PatientSerachColInfo } from '../models/patient-search.model';
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

@Component({
  selector: 'zhealthcare-patients-grid',
  templateUrl: './patients-grid.component.html',
  styles:[]
})
export class PatientsGridComponent implements AfterViewInit{
  private settlementHeight = 20;

  searchItem = new FormControl();

  @ViewChild('gridHeader') gridHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<FakePatient>([]);
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

  fruits = ['Internal Medicine', 'Family Medicine', 'Sports Medicine'];

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
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
  patientsData$: any;
  columnInformation: any;

  constructor(
    public dialog: MatDialog,
    public _scrollService: ScrollService,
    public gridService: GridService,
    private elem: ElementRef,
    private _router: Router,
    public _fullScreenService: FullScreenService,
    public patientService : PatientService,
    public patientFormService: PatientFormsService
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          await this.setHeaderHeights();
        }
      });
      this.patientsData$ = this.patientService.getPatients().pipe(tap(x=>
        console.log(x)
        ));
      this.columnInformation = PatientSerachColInfo;
      this.InitializeDataSource();
  }

  private InitializeDataSource() {

    this.columnInformation = PatientSerachColInfo;
    this.displayedColumns = this.columnInformation
                              .filter(x=> x.isDisplayColumn)
                              .map(x=>x.fieldName);
    this.displayedColumns.push("actions");
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  //chips code end

}
