import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from '@exxat/ux';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { StickyTableHeaderLayoutService } from '../../services';

interface PeriodicElement {
  name: string;
  email: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { email: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { email: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { email: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { email: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { email: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { email: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { email: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { email: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { email: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { email: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { email: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { email: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { email: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { email: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { email: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { email: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { email: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { email: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { email: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { email: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { email: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { email: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { email: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
];

@Component({
  selector: 'student-info',
  templateUrl: './student-info.component.html',
})
export class StudentInfoComponent implements AfterViewInit {
  page_heder_height = new BehaviorSubject<number>(0);
  page_heder_height$ = this.page_heder_height.asObservable();

  searchItem = new FormControl();

  @ViewChild('page_table_header') page_table_header: ElementRef;

  cotainer_header_height: number = 0;

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  /**
   *
   */
  constructor(
    public readonly _stickyTableHeaderLayoutService: StickyTableHeaderLayoutService,
    public readonly _headerService: HeaderService
  ) {
    console.log(this.cotainer_header_height);
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this.setPageHeaderHeight();
    });
  }

  private setPageHeaderHeight(): void {
    if (this.page_table_header && this.page_table_header !== null) {
      this.page_heder_height.next(
        this.page_table_header.nativeElement.offsetHeight
      );
    }
  }
}
