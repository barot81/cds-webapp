



import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../student-grid/grid.service';
import { UXDemoDrawerService } from '../../../remote-entry/ux-demo-drawer.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  statusClass:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Pending for review', weight: 1.0079, symbol: 'H',statusClass:"pending" },
  { position: 2, name: 'Get Started', weight: 4.0026, symbol: 'He',statusClass:"getstarted" },
  { position: 3, name: 'Approve', weight: 6.941, symbol: 'Li',statusClass:"approved" },
  { position: 4, name: 'Approve', weight: 9.0122, symbol: 'Be',statusClass:"approved" },
  { position: 5, name: 'Submitted', weight: 10.811, symbol: 'B',statusClass:"inprogress" },
  { position: 1, name: 'Pending for review', weight: 1.0079, symbol: 'H',statusClass:"pending" },
  { position: 2, name: 'Get Started', weight: 4.0026, symbol: 'He',statusClass:"getstarted" },
  { position: 3, name: 'Approve', weight: 6.941, symbol: 'Li',statusClass:"approved" },
  { position: 4, name: 'Approve', weight: 9.0122, symbol: 'Be',statusClass:"approved" },
  { position: 5, name: 'Submitted', weight: 10.811, symbol: 'B',statusClass:"inprogress" },
  { position: 1, name: 'Pending for review', weight: 1.0079, symbol: 'H',statusClass:"pending" },
  { position: 2, name: 'Get Started', weight: 4.0026, symbol: 'He',statusClass:"getstarted" },
  { position: 3, name: 'Approve', weight: 6.941, symbol: 'Li',statusClass:"approved" },
  { position: 4, name: 'Approve', weight: 9.0122, symbol: 'Be',statusClass:"approved" },
  { position: 5, name: 'Submitted', weight: 10.811, symbol: 'B',statusClass:"inprogress" },

 
];

@Component({
  selector: 'ryzen-eval-form-table',
  templateUrl: './eval-form-table.component.html',
  styleUrls: ['./eval-form-table.component.scss']
})
export class EvalFormTableComponent  implements OnInit {

  @ViewChild('gray_header') $gray_header: ElementRef;
  @ViewChild('search_bar_filter_container') $search_bar_filter_container: ElementRef;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(public headerService: HeaderService, public gridService: GridService, public _UXDemoDrawerService: UXDemoDrawerService) { }

  ngAfterViewInit() {
    setTimeout(() => {

      let gray_header_height = this.$gray_header.nativeElement.offsetHeight;
      let search_bar_filter_container = this.$search_bar_filter_container.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(gray_header_height + search_bar_filter_container);

    });

  }

  ngOnInit() {
  }

}



