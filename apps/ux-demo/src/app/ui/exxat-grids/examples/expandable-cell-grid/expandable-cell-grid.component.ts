import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from '@zhealthcare/ux';

export interface PeriodicElement {
  name: string;
  action: string;
  weight: number;
  symbol: string;
  height: number;
  size: string;
  color: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { action: '', name: 'Hydrogen', weight: 1.0079, symbol: 'H', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Helium', weight: 4.0026, symbol: 'He', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Lithium', weight: 6.941, symbol: 'Li', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Beryllium', weight: 9.0122, symbol: 'Be', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Boron', weight: 10.811, symbol: 'B', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Carbon', weight: 12.0107, symbol: 'C', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Nitrogen', weight: 14.0067, symbol: 'N', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Oxygen', weight: 15.9994, symbol: 'O', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Fluorine', weight: 18.9984, symbol: 'F', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' },
  { action: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', height: 1.0079, size: 'small', color: 'pink' }
];

@Component({
  selector: 'zhealthcare-app-expandable-cell-grid',
  templateUrl: './expandable-cell-grid.component.html'
})
export class ExpandableCellGridComponent implements AfterViewInit {

  /**
   *
   */
  constructor(public _headerService: HeaderService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(0);
    });
  }

  displayedColumns: string[] = ['action', 'name', 'weight', 'symbol', 'height', 'size', 'color'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}
