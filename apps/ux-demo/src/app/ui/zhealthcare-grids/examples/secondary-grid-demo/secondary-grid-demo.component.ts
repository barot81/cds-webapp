import { Component, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';
import { GridService } from '../../../../apps/student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

import { HeaderService } from '@zhealthcare/ux';

export interface PeriodicElement {
  src: string;
  student_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student_name: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student_name: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Conant, Julie' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Ahmed, Morgan' },
  { src: "assets/images/avat../../../../student-grid/grid.servicears/alice.jpg", student_name: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student_name: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Conant, Julie' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student_name: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student_name: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Conant, Julie' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student_name: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student_name: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student_name: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student_name: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student_name: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student_name: 'Conant, Julie' }
];
@Component({
  selector: 'ryzen-secondary-grid-demo',
  templateUrl: './secondary-grid-demo.component.html',
  styleUrls: ['./secondary-grid-demo.component.scss']
})
export class SecondaryGridDemoComponent implements AfterViewInit {

  scroll_pointer:number = 0;
  scroll_pointer_bottom: number;
  
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
      this.scroll_pointer= (event.target as HTMLElement).scrollLeft
    }

    tableHeaderFixed:boolean= false;
    tooltipOptions = {
      'contentType': 'string',
      'placement': 'right',
      'trigger': 'hover',
      'max-width': '450',
      'width': '450',
      'pointerEvents': 'auto'
    }

  searchText: string;
  statuses = [
    { value: "Get Started", viewValue: "Get Started" },
    { value: "In Progress", viewValue: "In Progress" },
    { value: "Pending Review", viewValue: "Pending Review" },
    { value: "Approved", viewValue: "Approved" },
    { value: "Disapproved", viewValue: "Disapproved" },
    { value: "Expiring", viewValue: "Expiring" },
    { value: "Expired", viewValue: "Expired" }
  ];

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();
  statuscontrol = new FormControl();
  tables = [0];

  constructor(public headerService: HeaderService, private elem: ElementRef, public gridService: GridService,public _UXDemoDrawerService: UXDemoDrawerService) {

    this.displayedColumns.length = 18;
    this.displayedColumns.fill('address', 1, 2);
    this.displayedColumns.fill('email', 2, 3);
    this.displayedColumns.fill('phone', 3, 4);
    this.displayedColumns.fill('cohort', 4, 5);
    this.displayedColumns.fill('setting', 5, 6);
    this.displayedColumns.fill('status', 6, 7);
    this.displayedColumns.fill('actions', 7, 8);
    this.displayedColumns.fill('hi', 8, 9);
    this.displayedColumns.fill('cpr', 9, 10);
    this.displayedColumns.fill('pals', 10, 11);
    this.displayedColumns.fill('licensure', 11, 12);
    this.displayedColumns.fill('hipaa', 12, 13);
    this.displayedColumns.fill('sis', 13, 14);
    this.displayedColumns.fill('corf', 14, 15);
    this.displayedColumns.fill('ds', 15, 16);
    this.displayedColumns.fill('bgc', 16, 17);
    this.displayedColumns.fill('fp', 17, 18);

    // The first two columns should be student_name and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'student_name';
  }

   //code for onclick single row select and outside table click event
   clicked: string = '';
   @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (!this.elem.nativeElement.querySelector('#stickyHeaderTable').contains(event.target)){
      if(this.clickedRows.size){
        this.highlightedRows = this.clickedRows;
      }
      this.clickedRows=new Set<PeriodicElement>();
    }
  }

  addRow(row){
    if(this.clickedRows.size){
      if(this.clickedRows.has(row)){
        this.clickedRows = new Set<PeriodicElement>();
      }else{
        this.clickedRows = new Set<PeriodicElement>();
        this.clickedRows.add(row);
      }
    }else{
      this.clickedRows.add(row);
    }
    this.highlightedRows = new Set<PeriodicElement>();
  }
  //code for onclick single row select and outside table click event

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(0);
    });
  }


}


  