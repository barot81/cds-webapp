/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';
import { GridService } from '../../../../apps/student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

import { FullScreenService, ScrollService } from '@exxat/ux';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ExxatTag } from '@exxat/plugin/tags';

export interface PeriodicElement {
  src: string;
  student_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan'
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD'
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy'
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla'
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan'
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD'
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy'
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla'
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan'
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD'
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy'
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla'
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan'
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD'
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy'
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla'
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' }
];
@Component({
  selector: 'ryzen-secondary-grid',
  templateUrl: './secondary-grid.component.html',
  styleUrls: ['./secondary-grid.component.scss']
})
export class SecondaryGridComponent {
  scroll_pointer = 0;

  fixedSettledHeight = 72;

  fullScreenMode = false;

  @ViewChild('mainHeader') mainHeader: ElementRef;

  searchItem = new FormControl();

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    this.scroll_pointer = (event.target as HTMLElement).scrollLeft;
  }

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

  tableHeaderFixed = false;
  tooltipOptions = {
    contentType: 'template',
    placement: 'top',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
    'hide-delay': '-1'
  };

  searchText: string;
  statuses = [
    { value: 'Get Started', viewValue: 'Get Started' },
    { value: 'In Progress', viewValue: 'In Progress' },
    { value: 'Pending Review', viewValue: 'Pending Review' },
    { value: 'Approved', viewValue: 'Approved' },
    { value: 'Disapproved', viewValue: 'Disapproved' },
    { value: 'Expiring', viewValue: 'Expiring' },
    { value: 'Expired', viewValue: 'Expired' }
  ];

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();
  statuscontrol = new FormControl();
  tables = [0];

  constructor(
    private _router: Router,
    public _scrollService: ScrollService,
    public _fullScreenService: FullScreenService,
    private elem: ElementRef,
    public gridService: GridService,
    public _UXDemoDrawerService: UXDemoDrawerService
  ) {
    this.displayedColumns.length = 16;
    this.displayedColumns.fill('address', 1, 2);
    this.displayedColumns.fill('email', 2, 3);
    this.displayedColumns.fill('phone', 3, 4);
    this.displayedColumns.fill('cohort', 4, 5);
    this.displayedColumns.fill('setting', 5, 6);
    this.displayedColumns.fill('status', 6, 7);
    this.displayedColumns.fill('actions', 7, 8);
    this.displayedColumns.fill('pals', 8, 9);
    this.displayedColumns.fill('licensure', 9, 10);
    this.displayedColumns.fill('hipaa', 10, 11);
    this.displayedColumns.fill('sis', 11, 12);
    this.displayedColumns.fill('corf', 12, 13);
    this.displayedColumns.fill('ds', 13, 14);
    this.displayedColumns.fill('bgc', 14, 15);
    this.displayedColumns.fill('fp', 15, 16);

    // The first two columns should be student_name and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'student_name';

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.setMainHeaderHeight();
      });
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

  //code for onclick single row select and outside table click event
  clicked = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#stickyHeaderTable')
        .contains(event.target)
    ) {
      if (this.clickedRows.size) {
        this.highlightedRows = this.clickedRows;
      }
      this.clickedRows = new Set<PeriodicElement>();
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
  //code for onclick single row select and outside table click event

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  showTestAlert() {
    alert('test button clicked');
    document.addEventListener('fullscreenchange', async () => {
      if (document.fullscreenElement) {
        this.fullScreenMode = true;
        await this._scrollService.resetMainHeaderHeight();
        await this._scrollService.setMainHeaderHeight(this.fixedSettledHeight);
        this._fullScreenService.setFullScreenModeEnabled(true);
      } else {
        this.fullScreenMode = false;
        await this.setMainHeaderHeight();
        this._fullScreenService.setFullScreenModeEnabled(false);
      }
    });
  }

  //#endregion
  private async setMainHeaderHeight() {
    setTimeout(async () => {
      if (this.mainHeader && this.mainHeader !== null) {
        // Reset Main Header Height
        await this._scrollService.resetMainHeaderHeight();
        // Set Main Header Height
        await this._scrollService.setMainHeaderHeight(
          this.mainHeader.nativeElement.offsetHeight - this.fixedSettledHeight
        );
      }
    });
  }

  // async toggleFullScreenMode() {
  //   this.fullScreenMode = !this.fullScreenMode;
  //   var el = document.documentElement;
  //   if (this.fullScreenMode) {
  //     setTimeout(async () => {
  //       el.requestFullscreen();
  //       await this._scrollService.resetMainHeaderHeight();
  //       await this._scrollService.setMainHeaderHeight(this.fixedSettledHeight);
  //     });
  //   } else {
  //     document.exitFullscreen();
  //     await this.setMainHeaderHeight();
  //   }
  //   this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  // }
}
