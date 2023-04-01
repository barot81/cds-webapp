import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExecSyncOptionsWithStringEncoding } from 'child_process';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';
import { HeaderService } from '@exxat/ux';
import { BehaviorSubject } from 'rxjs';
import { PlanDemoHeaderLayoutService } from '../plan-static-header-service';
import { GridService } from '../../../student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

export interface PeriodicElement {
  date: string;
  action: string;
  time: string;
  title: string;
  faculty:string;
  location:string;
  reference:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General',location:'Lorem ipsum' , reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General',location:'Lorem ipsum', reference:'Lorem ipsum' },
  { action: '', date: '12/5/20', time:'11AM', title: 'XYZ',faculty: 'General',location:'Lorem ipsum' , reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ' ,faculty: 'General',location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ' ,faculty: 'General',location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General',location:'Lorem ipsum' , reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General',location:'Lorem ipsum', reference:'Lorem ipsum' },
  { action: '', date: '12/5/20', time:'11AM', title: 'XYZ',faculty: 'General',location:'Lorem ipsum' , reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ' ,faculty: 'General',location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ' ,faculty: 'General',location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
  { action: '', date: '12/5/20', time: '11AM', title: 'XYZ',faculty: 'General' ,location:'Lorem ipsum', reference:'Lorem ipsum'},
];

@Component({
  selector: 'ryzen-event-schedule-demo',
  templateUrl: './event-schedule-demo.component.html',
  styleUrls: ['./event-schedule-demo.component.scss']
})
export class EventScheduleDemoComponent implements OnInit, AfterViewInit {

  page_table_header_height = new BehaviorSubject<number>(0);
  page_table_header_height$ = this.page_table_header_height.asObservable(); 
  // @ViewChild('search_bar_filter_container') $search_bar_filter_container: ElementRef;
  @ViewChild('page_table_header') page_table_header: ElementRef;

  tables = [0];
  displayedColumns: string[] = ['action', 'date', 'time', 'title','faculty','location','reference', 'attribute1', 'attribute2', 'attribute3','attribute4','attribute5'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(public gridService: GridService ,  
    public _PlanAppDemoDrawerService: PlanAppDemoDrawerService,
    public _headerService:HeaderService, public _planHeaderLayoutService: PlanDemoHeaderLayoutService,public _UXDemoDrawerService: UXDemoDrawerService) { }

  
    ngAfterViewInit(){
    setTimeout(async()=>{
      await this._headerService.setCurrentHeaderHeight(0);
      await this.setPageHeaderHeight();
    }) 
  }

  private setPageHeaderHeight(){
    if(this.page_table_header && this.page_table_header !== null){
      this.page_table_header_height.next(
        this.page_table_header.nativeElement.offsetHeight + 2
      );
    }
  }

  ngOnInit() {
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     let search_bar_filter_container = this.$search_bar_filter_container.nativeElement.offsetHeight;
  //     this.headerService.setCurrentHeaderHeight(search_bar_filter_container);
  //   });
  // }

}
