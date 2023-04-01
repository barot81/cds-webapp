import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FullScreenService, HeaderService } from '@zhealthcare/ux';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../../../../apps/student-grid/grid.service';


export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: Array<string>;
  height: number;
  size: Array<string>;
  color: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: ['H', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Helium',
    weight: 4.0026,
    symbol: ['He', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Lithium',
    weight: 6.941,
    symbol: ['Li', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Beryllium',
    weight: 9.0122,
    symbol: ['Be', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Boron',
    weight: 10.811,
    symbol: ['B', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Carbon',
    weight: 12.0107,
    symbol: ['C', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: ['N', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Oxygen',
    weight: 15.9994,
    symbol: ['O', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Fluorine',
    weight: 18.9984,
    symbol: ['F', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
  {
    name: 'Neon',
    weight: 20.1797,
    symbol: ['Ne', 's'],
    height: 1.0079,
    size: [
      'Proin fermentum faucibus felis',
      'nec rutrum arcu rhoncus et',
      'Nam malesuada lacus in sagittis egestas.',
    ],
    color: 'pink',
  },
];

@Component({
  selector: 'zhealthcare-app-multi-row-grid-example',
  templateUrl: './multi-row-grid-example.component.html',
})
export class MultiRowGridExampleComponent implements AfterViewInit {
  searchItem = new FormControl();
  @ViewChild('search_bar_filter_container')
  $search_bar_filter_container: ElementRef;
  fixedSettledHeight: number = 135;
  fullScreenMode: boolean = false;
  @ViewChild('header') elementView: ElementRef;

  displayedColumns: string[] = [
    'name',
    'weight',
    'symbol',
    'height',
    'size',
    'color',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();
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
        .querySelector('#multi-row-grid')
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
      this._headerService.setCurrentHeaderHeight(
        this.$search_bar_filter_container.nativeElement.offsetHeight
      );
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
}
