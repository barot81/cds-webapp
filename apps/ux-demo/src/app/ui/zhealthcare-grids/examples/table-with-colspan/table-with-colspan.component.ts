import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FullScreenService, HeaderService } from '@zhealthcare/ux';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../../../../apps/student-grid/grid.service';

export interface PeriodicElement {
  one: string;
  position: string;
  two: string;
  three: string;
}
export interface BlueColorBy {
  initial: string;
  isBlueColorBy: boolean;
}

export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}

const ELEMENT_DATA: (PeriodicElement | GroupBy | BlueColorBy)[] = [
  { initial: ' ', isBlueColorBy: true },
  { initial: '', isGroupBy: true },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  { initial: '', isGroupBy: true },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
  {
    position: '1. Possess the theoretical and scientific',
    one: 'Example 1st',
    two: 'Example 2nd',
    three: 'Example 3rd',
  },
];

@Component({
  selector: 'ryzen-table-with-colspan',
  templateUrl: './table-with-colspan.component.html',
})
export class TableWithColspanComponent implements AfterViewInit {
  searchItem = new FormControl();
  displayedColumns: string[] = [
    'position',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'tweleve',
  ];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();
  fixedSettledHeight: number = 5;
  fullScreenMode: boolean = false;
  @ViewChild('header') elementView: ElementRef;
  /**
   *
   */
  constructor(
    public _headerService: HeaderService,
    public _fullScreenService: FullScreenService,
    public gridService: GridService,
    private elem: ElementRef,
    public _UXDemoDrawerService: UXDemoDrawerService
  ) {}

  //code for onclick single row select and outside table click event
  clicked: string = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#grid-with-colspan')
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

  ngAfterViewInit() {
    this.setGridHeight();
    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(0);
    });
  }

  showTestAlert() {
    alert('test button clicked');
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this._headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
        this.fullScreenMode = true;
        this._fullScreenService.setFullScreenModeEnabled(true);
      } else {
        this.fullScreenMode = false;
        this.setGridHeight();
        this._fullScreenService.setFullScreenModeEnabled(false);
      }
    });
  }

  //#endregion
  setGridHeight(): void {
    setTimeout(() => {
      let height =
        this.elementView.nativeElement.offsetHeight + this.fixedSettledHeight;
      this._headerService.setCurrentHeaderHeight(height);
    });
  }

  // toggleFullScreenMode() {
  //   this.fullScreenMode = !this.fullScreenMode;
  //   var el = document.documentElement;
  //   if (this.fullScreenMode) {
  //     setTimeout(() => {
  //       el.requestFullscreen();
  //       this._headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
  //     });
  //   }
  //   else {
  //     document.exitFullscreen();
  //     this.setGridHeight();
  //   }
  //   this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  // }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  isBlueColor(index, item): boolean {
    return item.isBlueColorBy;
  }
}
