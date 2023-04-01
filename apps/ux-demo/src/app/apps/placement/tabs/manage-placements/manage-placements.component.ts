
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeaderService } from '@zhealthcare/ux';
import { startWith, map } from 'rxjs/operators';
import { FullScreenService, GoToColumnComponent } from '@zhealthcare/ux';
import { GridService } from '../../../student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

export interface PeriodicElement {
  index: number;
  src: string;
  student: string;
  id: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { index: 0, src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan', id: 'id-' + 0 },
  { index: 1, src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah', id: 'id-' + 1 },
  { index: 2, src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD', id: 'id-' + 2 },
  { index: 3, src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly', id: 'id-' + 3 },
  { index: 4, src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley', id: 'id-' + 4 },
  { index: 5, src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica', id: 'id-' + 5 },
  { index: 6, src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy', id: 'id-' + 6 },
  { index: 7, src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla', id: 'id-' + 7 },
  { index: 8, src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi', id: 'id-' + 8 },
  { index: 9, src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie', id: 'id-' + 9 },
  { index: 0, src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan', id: 'id-' + 0 },
  { index: 1, src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah', id: 'id-' + 1 },
  { index: 2, src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD', id: 'id-' + 2 },
  { index: 3, src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly', id: 'id-' + 3 },
  { index: 4, src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley', id: 'id-' + 4 },
  { index: 5, src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica', id: 'id-' + 5 },
  { index: 6, src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy', id: 'id-' + 6 },
  { index: 7, src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla', id: 'id-' + 7 },
  { index: 8, src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi', id: 'id-' + 8 },
  { index: 9, src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie', id: 'id-' + 9 }
];


@Component({
  selector: 'ryzen-manage-placements',
  templateUrl: './manage-placements.component.html',
  styleUrls: ['./manage-placements.component.scss']
})
export class ManagePlacementsComponent extends GoToColumnComponent implements OnInit, AfterViewInit {

  tooltipOptions = {
    'contentType': 'string',
    'placement': 'right',
    'trigger': 'hover',
    'max-width': '450',
    'width': '450',
    'pointerEvents': 'auto'
  }

  fixedSettledHeight: number = 120;

  fullScreenMode: boolean = false;

  @ViewChild('header') elementView: ElementRef;
  @ViewChild('auto_scroll_grid') auto_scroll_grid: ElementRef;

  selectedColumn: string;

  statuses = [
    { value: "Get Started", viewValue: "Get Started" },
    { value: "In Progress", viewValue: "In Progress" },
    { value: "Pending Review", viewValue: "Pending Review" },
    { value: "Approved", viewValue: "Approved" },
    { value: "Disapproved", viewValue: "Disapproved" },
    { value: "Expiring", viewValue: "Expiring" },
    { value: "Expired", viewValue: "Expired" }
  ];

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  tables = [0];

  columnControl = new FormControl();

  filteredOptions: Observable<string[]>;

  cohortList = [
    'Cohort 2021',
    'Cohort 2022',
    'Cohort 2023',
    'Cohort 2024',
    'Cohort 2025',
  ];


  navigations = [
    {
      id: 'tab1',
      title: 'Tab 1',
      type: 'item',
      url: '/admin/ux/ui/new-grid-guidelines'
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      type: 'item',
      url: '/admin/ux/ui/general'
    }
  ]

  constructor( public headerService: HeaderService, public renderer: Renderer2, public _fullScreenService: FullScreenService, public gridService: GridService,public _UXDemoDrawerService: UXDemoDrawerService) {
    super(renderer);
    this.displayedColumns.length = 10;
    this.displayedColumns.fill('one', 1, 2);
    this.displayedColumns.fill('two', 2, 3);
    this.displayedColumns.fill('three', 3, 4);
    this.displayedColumns.fill('four', 4, 5);
    this.displayedColumns.fill('five', 5, 6);
    this.displayedColumns.fill('six', 6, 7);
    this.displayedColumns.fill('seven', 7, 8);
    this.displayedColumns.fill('eight', 8, 9);
    this.displayedColumns.fill('nine', 9, 10);

    // The first two columns should be student and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'student';

  }

  ngOnInit() {
    this.filteredOptions = this.columnControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.columnControl.valueChanges.subscribe(data => {
      if (data && data.length > 0) {
        this.selectedColumn = data;
        if (this.displayedColumns.includes(this.selectedColumn)) {
          this.scrollToColumn(this.selectedColumn, 0);
        }
      }
    })

    //#region  [Full Screen Event Access]

    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        this.fullScreenMode = true;
        this._fullScreenService.setFullScreenModeEnabled(true);
      } else {
        this.fullScreenMode = false;
        this._fullScreenService.setFullScreenModeEnabled(false);
      }
    }
    );

    //#endregion

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.displayedColumns.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(0);
    });
  }

  toggleFullScreenMode() {
    this.fullScreenMode = !this.fullScreenMode;
    if (this.fullScreenMode) {
      var el = document.documentElement;
      el.requestFullscreen();
      this.setGridHeight();
    }
    else {
      document.exitFullscreen();
    }
    this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);

  }

  setGridHeight() {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
    });
  }
}

