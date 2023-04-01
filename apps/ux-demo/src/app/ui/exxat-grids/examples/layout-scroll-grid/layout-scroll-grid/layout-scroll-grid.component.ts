import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ExxatTag } from '@exxat/plugin/tags';

import { FullScreenService, ScrollService } from '@exxat/ux';
import { GridService } from '../../../../../apps/student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../../remote-entry/ux-demo-drawer.service';

import { LayoutScrollService } from '../services';

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
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Bradford Montgomery',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Albert Ortega',
    address: '16 942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Bradford Montgomery',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '247 Lookout Lane, Springfield Gardens, NY 11413',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Albert Ortega',
    address: '16 942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '942 NE. Glen Eagles St., Cantonment, FL 32533',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    actions: '',
    statusClass: 'disapproved',
  },
  {
    name: 'Bradford Montgomery',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
    cohort: 'Cohort XYZ',
    status: 'Active',
    actions: '',
    statusClass: 'approved',
  },
];

@Component({
  selector: 'exxat-layout-scroll-grid',
  templateUrl: './layout-scroll-grid.component.html',
})
export class LayoutScrollGridComponent {
  fullScreenMode: boolean = false;

  @ViewChild('gridHeader') gridHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  private settlementHeight: number = 36;

  private currentURL = '/admin/ux/ui/exxat-layout-scroll';

  _unsubscribeAll = new Subject();

  displayedColumns: string[] = [
    'name',
    'address',
    'email',
    'phone',
    'cohort',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();

  tags: Array<ExxatTag> = [
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

  constructor(
    public _scrollService: ScrollService,
    private elem: ElementRef,
    public gridService: GridService,
    private _router: Router,
    public _UXDemoDrawerService: UXDemoDrawerService,
    public _fullScreenService: FullScreenService,
    private readonly _layoutScrollService: LayoutScrollService
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          this.setGridHeaderHeight(this.settlementHeight);
        }
      });
  }

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

  private async setGridHeaderHeight(settlementHeight: number) {
    setTimeout(async () => {
      if (
        this.gridHeader &&
        this.gridHeader !== null &&
        this.pagination &&
        this.pagination !== null
      ) {
        await this._scrollService.setContentHeaderHeight(
          this._scrollService.getContentHeaderHeight() +
            this.gridHeader.nativeElement.offsetHeight +
            this.pagination.nativeElement.offsetHeight +
            settlementHeight
        );
      }
    });
  }
  //chips code
  fruits: string[] = ['Cohort Dsdsj', 'Cohort Dsdsj', 'Cohort Dsdsj'];
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
    { value: 'Time', id: 5 },
  ];

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  // public async toggleFullScreenMode() {
  //   this.fullScreenMode = !this.fullScreenMode;
  //   if (this.fullScreenMode) {
  //     //Reset Header Heights
  //     await this._scrollService.resetMainHeaderHeight();
  //     await this._scrollService.resetContentHeaderHeight();
  //     // Set Only Grid Header Heights
  //     await this.setGridHeaderHeight(0);
  //     document.documentElement.requestFullscreen();
  //   } else {
  //     await this._scrollService.setMainHeaderHeight(
  //       this._layoutScrollService.mainHeaderHeight
  //     );
  //     await this._scrollService.setContentHeaderHeight(
  //       this._layoutScrollService.contentHeaderOneHeight
  //     );
  //     await this.setGridHeaderHeight(this.settlementHeight);
  //     document.exitFullscreen();
  //   }
  //   this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  // }

  showTestAlert() {
    alert('test button clicked');

    document.addEventListener('fullscreenchange', () => {
      // if (document.fullscreenElement) {
      //   this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
      //   this.fullScreenMode = true;
      //   this._fullScreenService.setFullScreenModeEnabled(true);
      // } else {
      //   this.fullScreenMode = false;
      //   this.setGridHeight();
      //   this._fullScreenService.setFullScreenModeEnabled(false);
      // }
    });
  }
}
