import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from '@exxat/ux';
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
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'ryzen-condensed-grid',
  templateUrl: './condensed-grid.component.html',
  styleUrls: ['./condensed-grid.component.scss']
})
export class CondensedGridComponent implements AfterViewInit {

  @ViewChild('gray_header') $gray_header: ElementRef;
  @ViewChild('search_bar_filter_container') $search_bar_filter_container: ElementRef;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(public headerService: HeaderService, 
    // public gridService: GridService (not in use)
    ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      let gray_header_height = this.$gray_header.nativeElement.offsetHeight;
      let search_bar_filter_container = this.$search_bar_filter_container.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(gray_header_height + search_bar_filter_container);
    });
  }
}




