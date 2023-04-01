import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { FullScreenService, ScrollService } from '@exxat/ux';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GridService } from '../../../../apps/student-grid/grid.service';

export interface Element {
  name: string;
  firstName: string;
  lastName: string;
  document: string;
  documentStatus: string;
  symbol: string;
  lastSent: string;
  comment: string;
  isExpanded: boolean;
}

const data: Element[] = [
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'H',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '5 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'He',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '6 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Li',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '8 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Be',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '10 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'B',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '11 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'C',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '12 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'N',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'O',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'F',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Ne',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Na',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Mg',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Al',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Si',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'P',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'S',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Cl',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Ar',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'K',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
  {
    document: '4 Document',
    firstName: 'Jhon',
    lastName: 'Smith',
    documentStatus: '4 Status',
    symbol: 'Ca',
    lastSent: '2 Time sent',
    comment: '2 Comments',
    isExpanded: false,
    name: '',
  },
];

@Component({
  selector: 'ryzen-expandable-grid-example',
  templateUrl: './expandable-grid-example.component.html',
  styleUrls: ['./expandable-grid-example.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ExpandableGridExampleComponent {
  rows = [];

  @ViewChild('mainHeader') mainHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  displayedColumns = [
    'select',
    'arrow',
    'name',
    'document',
    'documentStatus',
    'lastSent',
    'comment',
  ];
  dataSource = new MatTableDataSource<Element>(data);
  selection = new SelectionModel<Element>(true, []);
  clickedRows = new Set<Element>();
  highlightedRows = new Set<Element>();
  selectedValue: string;
  arrowValue: string;
  fixedSettledHeight: number = 35;
  fullScreenMode: boolean = false;
  @ViewChild('header') elementView: ElementRef;

  searchItem = new FormControl();
  
  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(
    public _scrollService: ScrollService,
    private elem: ElementRef,
    public _fullScreenService: FullScreenService,
    public _UXDemoDrawerService: UXDemoDrawerService,
     public gridService: GridService,
    private _router: Router
  ) {
    this.initiateRows().subscribe((value) => {
      this.dataSource.data = value;
    });

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setHeaderHeights();
      });
  }

  expandClick(row) {
    row.isExpanded = !row.isExpanded;
  }

  //code for outside table click event
  clicked: string = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#expanableTable')
        .contains(event.target)
    ) {
      if (this.clickedRows.size) {
        this.highlightedRows = this.clickedRows;
      }
      this.clickedRows = new Set<Element>();
    }
  }
  //end of code for outside table click event

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name + 1
    }`;
  }

  initiateRows(): Observable<Element[]> {
    this.dataSource.data.forEach((element) => {
      this.rows.push(element, { detailRow: true, element });
    });
    return of(this.rows);
  }

  showTestAlert() {
    alert('test button clicked');
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this._scrollService.setMainHeaderHeight(0);
        this._scrollService.setContentHeaderHeight(0);
        this.fullScreenMode = true;
        this._fullScreenService.setFullScreenModeEnabled(true);
      } else {
        this.fullScreenMode = false;
        this.setHeaderHeights();
        this._fullScreenService.setFullScreenModeEnabled(false);
      }
    });
  }

  //#endregion
  private async setHeaderHeights() {
    setTimeout(async () => {
      if (
        this.mainHeader &&
        this.mainHeader !== null &&
        this.pagination &&
        this.pagination !== null
      ) {
        // Reset Heights
        this._scrollService.resetMainHeaderHeight();
        this._scrollService.resetContentHeaderHeight();

        // Set Heights
        this._scrollService.setMainHeaderHeight(
          this.mainHeader.nativeElement.offsetHeight
        );
        this._scrollService.setContentHeaderHeight(
          this.pagination.nativeElement.offsetHeight
        );
      }
    });
  }
}
