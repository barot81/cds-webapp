import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ExxatTag } from '@exxat/plugin/tags';
import { GridService } from 'apps/ux-demo/src/app/apps/student-grid/grid.service';
import { UXDemoDrawerService } from 'apps/ux-demo/src/app/remote-entry/ux-demo-drawer.service';
// import { WithoutStickyHeaderPopupComponent } from '../../components';


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

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    address: '16 942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    address: '16 942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved'
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved'
  }
];

@Component({
  selector: 'adaptive-grid-example',
  templateUrl: './adaptive-grid.component.html',
  styleUrls: ['./adaptive-grid.component.scss']
})
export class AdaptiveGridExampleComponenent {
  private settlementHeight: number = 20;

  searchItem = new FormControl();

  @ViewChild('gridHeader') gridHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  displayedColumns: string[] = [
    'name',
    'address',
    'email',
    'phone',
    'cohort',
    'status',
    'actions'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();

  tags: Array<ExxatTag> = [
    {
      id: Math.random(),
      name: 'Tag Label 1 Bigger Text',
      color: 'indigo-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 2',
      color: 'deep-orange-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 3',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 4 Bigger Text',
      color: 'blue-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 5',
      color: 'gray-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 6',
      color: 'purple-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 7 Bigger Text',
      color: 'yellow-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 8',
      color: 'green-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 9',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 10 Bigger Text',
      color: 'indigo-500',
      isChecked: true
    }
  ];

  constructor(
    public dialog: MatDialog,
    public gridService: GridService,
    private elem: ElementRef,
    public _UXDemoDrawerService: UXDemoDrawerService
  ) {
  }


//   openDialog() {
//     const dialogRef = this.dialog.open(WithoutStickyHeaderPopupComponent);
//   }

  //code for onclick single row select and outside table click event
  clicked: string = '';
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
          this.clickedRows = new Set<PeriodicElement>();
        }
      }
    }
  }

  addRow(row) {
    if (this.clickedRows.size) {
      if (this.clickedRows.has(row)) {
        this.clickedRows = new Set<PeriodicElement>();
      } else {
        this.clickedRows = new Set<PeriodicElement>();
        this.clickedRows.add(row);
      }
    } else {
      this.clickedRows.add(row);
    }
    this.highlightedRows = new Set<PeriodicElement>();
  }

  //chips code
  fruits: string[] = [
    'Internal Medicine',
    'Family Medicine',
    'Sports Medicine'
  ];
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  //chips code end

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 }
  ];

  tooltipOptions = {
    contentType: 'template',
    placement: 'top',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto'
  };

  buttonTooltipOptions = {
    contentType: 'string',
    placement: 'top',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto'
  };
}
