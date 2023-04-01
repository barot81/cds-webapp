import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';
import { HeaderService } from '@exxat/ux';
import { BehaviorSubject } from 'rxjs';
import { ComplianceManagementHeaderLayoutService } from '../compliace_management_header.service';
import { GridService } from '../../../student-grid/grid.service';
import { UXDemoDrawerService } from 'apps/ux-demo/src/app/remote-entry/ux-demo-drawer.service';


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
  selector: 'ryzen-compliance-management-summary',
  templateUrl: './compliance-management-summary.component.html',
})
export class ComplianceManagementSummaryComponent implements AfterViewInit {

  table_header_height = new BehaviorSubject<number>(0);
  table_header_height$ = this.table_header_height.asObservable();
  @ViewChild('table_header') table_header: ElementRef;
  searchText: string;
  
  statuses = [
    {value:"Get Started",viewValue:"Get Started"},
    {value:"In Progress",viewValue:"In Progress"},
    {value:"Pending Review",viewValue:"Pending Review"},
    {value:"Approved",viewValue:"Approved"},
    {value:"Disapproved",viewValue:"Disapproved"},
    {value:"Expiring",viewValue:"Expiring"},
    {value:"Expired",viewValue:"Expired"}
  ];

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  statuscontrol = new FormControl();
  tables = [0];

  constructor(public _UXDemoDrawerService:UXDemoDrawerService,public gridService: GridService, public _headerService: HeaderService, public _complainerHeaderLayoutService: ComplianceManagementHeaderLayoutService ) {

    this.displayedColumns.length = 18;
    this.displayedColumns.fill('is',1,2);
    this.displayedColumns.fill('mmr',2,3);
    this.displayedColumns.fill('flu',3,4);
    this.displayedColumns.fill('tb',4,5);
    this.displayedColumns.fill('hepb',5,6);
    this.displayedColumns.fill('varicella',6,7);
    this.displayedColumns.fill('tdap',7,8);
    this.displayedColumns.fill('hi',8,9);
    this.displayedColumns.fill('cpr',9,10);
    this.displayedColumns.fill('pals',10,11);
    this.displayedColumns.fill('licensure',11,12);
    this.displayedColumns.fill('hipaa',12,13);
    this.displayedColumns.fill('sis',13,14);
    this.displayedColumns.fill('corf',14,15);
    this.displayedColumns.fill('ds',15,16);
    this.displayedColumns.fill('bgc',16,17);
    this.displayedColumns.fill('fp',17,18);

    // The first two columns should be student_name and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'student_name';
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this.setTableHeaderHeight();
    });
  }

  private setTableHeaderHeight(): void {
    if (this.table_header && this.table_header !== null) {
      this.table_header_height.next(
        this.table_header.nativeElement.offsetHeight
      );
    }
  }

}
