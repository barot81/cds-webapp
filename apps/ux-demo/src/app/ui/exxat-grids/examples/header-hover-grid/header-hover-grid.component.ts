import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FullScreenService, HeaderService } from '@exxat/ux';
import { MatSort } from '@angular/material/sort';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../../../../apps/student-grid/grid.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'ryzen-header-hover-grid',
  templateUrl: './header-hover-grid.component.html',
  styleUrls: ['./header-hover-grid.component.scss'],
})
export class HeaderHoverGridComponent implements OnInit {
  searchItem = new FormControl();
  @ViewChild('gray_header') $gray_header: ElementRef;
  @ViewChild('search_bar_filter_container')
  $search_bar_filter_container: ElementRef;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  fixedSettledHeight: number = 135;
  fullScreenMode: boolean = false;
  @ViewChild('header') elementView: ElementRef;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();

  constructor(
    public _UXDemoDrawerService: UXDemoDrawerService,
    public _fullScreenService: FullScreenService,
    public headerService: HeaderService,
    public gridService: GridService,
    private elem: ElementRef
  ) {}

  //code for onclick single row select and outside table click event
  clicked: string = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#headerHoerGrid')
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
      let gray_header_height = this.$gray_header.nativeElement.offsetHeight;
      let search_bar_filter_container =
        this.$search_bar_filter_container.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(
        gray_header_height + search_bar_filter_container
      );
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  showTestAlert() {
    alert('test button clicked');
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
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
      this.headerService.setCurrentHeaderHeight(height);
    });
  }

  // toggleFullScreenMode() {
  //   this.fullScreenMode = !this.fullScreenMode;
  //   var el = document.documentElement;
  //   if (this.fullScreenMode) {
  //     setTimeout(() => {
  //       el.requestFullscreen();
  //       this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
  //     });
  //   }
  //   else {
  //     document.exitFullscreen();
  //     this.setGridHeight();
  //   }
  //   this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  // }
}
