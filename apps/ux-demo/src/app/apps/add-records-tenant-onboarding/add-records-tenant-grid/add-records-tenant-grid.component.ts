
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';
import { HeaderService } from '@zhealthcare/ux';
import { MatTableDataSource } from '@angular/material/table';
import { StickyTableHeaderLayoutService } from '../../sticky-table-header-layout/services/sticky-header-table-layout.service';
import { BehaviorSubject } from 'rxjs';


export interface PeriodicElement {
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
    { email: 1, name: 'Hydrogen', weight: 9.0122, symbol: 'H' },
    { email: 2, name: 'Helium', weight: 9.0122, symbol: 'He' },
    { email: 3, name: 'Lithium', weight: 9.0122, symbol: 'Li' },
    { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    { email: 1, name: 'Hydrogen', weight: 9.0122, symbol: 'H' },
    { email: 2, name: 'Helium', weight: 9.0122, symbol: 'He' },
    { email: 3, name: 'Lithium', weight: 9.0122, symbol: 'Li' },
    { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    { email: 2, name: 'Helium', weight: 9.0122, symbol: 'He' },
    { email: 3, name: 'Lithium', weight: 9.0122, symbol: 'Li' },
    { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    { email: 1, name: 'Hydrogen', weight: 9.0122, symbol: 'H' },
    { email: 2, name: 'Helium', weight: 9.0122, symbol: 'He' },
    { email: 3, name: 'Lithium', weight: 9.0122, symbol: 'Li' },
    { email: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
    
  ];

@Component({
  selector: 'ryzen-add-records-tenant-grid',
  templateUrl: './add-records-tenant-grid.component.html',
})

export class AddRecordTenantGridComponent implements AfterViewInit {

  dataSourceRight = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = ['checkbox','name','email',  'roles', 'lastLogged' , 'status' , 'action'];
 
  page_heder_height = new BehaviorSubject<number>(0);
  page_heder_height$ = this.page_heder_height.asObservable();

  pagination_height = new BehaviorSubject<number>(0);
  pagination_height$ = this.pagination_height.asObservable();

  @ViewChild('page_table_header') page_table_header: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;
 
  constructor(public readonly _headerService: HeaderService, public readonly _stickyTableHeaderLayoutService: StickyTableHeaderLayoutService) {
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this.setPageHeaderHeight();
      await this.setPaginationHeight();
    });
  }

  private setPageHeaderHeight(): void {
    if (this.page_table_header && this.page_table_header !== null) {
      this.page_heder_height.next(
        this.page_table_header.nativeElement.offsetHeight
      );
    }
  }

  private setPaginationHeight(): void{
    if(this.pagination && this.pagination !== null){
      this.pagination_height.next(
        this.pagination.nativeElement.offsetHeight
      );
    }
    else{
      this.pagination_height.next(0)
    }
  }
}
