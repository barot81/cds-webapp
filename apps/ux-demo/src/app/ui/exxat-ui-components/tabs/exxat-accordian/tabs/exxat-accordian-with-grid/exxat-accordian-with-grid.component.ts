/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '@exxat/ux';
import { GridService } from '../../../../../../apps/student-grid/grid.service';

import { UXDemoDrawerService } from '../../../../../../remote-entry/ux-demo-drawer.service';

import { filter } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  email: string;
  cohort: string;
  status: string;
  statusClass: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    statusClass: 'disapproved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Albert Ortega',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'Active',
    statusClass: 'approved'
  },
  {
    name: 'Bradford Montgomery',
    email: 'albertortega@example.com',
    cohort: 'Cohort XYZ',
    status: 'In-Active',
    statusClass: 'disapproved'
  }
];

@Component({
  selector: 'exxat-accordian-with-grid',
  templateUrl: './exxat-accordian-with-grid.component.html'
})
export class ExxatAccordianWithGridComponent {
  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.scrollHeight > 40; // 40 is the value of height of the 2 line text
    } else {
      return false;
    }
  }

  private settlementHeight = 20;

  searchItem = new FormControl();

  @ViewChild('gridHeader') gridHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  displayedColumns: string[] = ['name', 'email', 'cohort', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();

  private currentURL = '/admin/ux/ui/search-bar-grids/without-sticky-header';

  constructor(
    public _scrollService: ScrollService,
    public gridService: GridService,
    private elem: ElementRef,
    private _router: Router,
    public _UXDemoDrawerService: UXDemoDrawerService
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          await this.setHeaderHeights();
        }
      });
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

  //code for onclick single row select and outside table click event
  clicked = '';
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
