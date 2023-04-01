
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';
import { GridService } from '../student-grid/grid.service';
import { BehaviorSubject } from 'rxjs';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';

export interface PeriodicElement {
  slotsOffered: string;
  schedule: number;
  slotsAvailable: number;
  slotsFilled: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { schedule: 1, slotsOffered: 'Hydrogen', slotsAvailable: 1.0079, slotsFilled: 'H', actions: 'three' },
  { schedule: 2, slotsOffered: 'Helium', slotsAvailable: 4.0026, slotsFilled: 'He', actions: 'three' },
  { schedule: 3, slotsOffered: 'Lithium', slotsAvailable: 6.941, slotsFilled: 'Li', actions: 'three' },
  { schedule: 4, slotsOffered: 'Beryllium', slotsAvailable: 9.0122, slotsFilled: 'Be', actions: 'three' },
];



@Component({
  selector: 'ryzen-compliance-document-demo',
  templateUrl: './compliance-document-demo.component.html',
  styleUrls: ['./compliance-document-demo.component.scss']
})
export class ComplianceDocumentDemoComponent implements OnInit, AfterViewInit {

  compliance_header_height = new BehaviorSubject<number>(0);
  compliance_header_height$ = this.compliance_header_height.asObservable();
  @ViewChild('compliance_document_header') compliance_document_header: ElementRef;

  navigations = [
    {
      id: 'tab1',
      title: 'Tab 1',
      type: 'item',
      url: '/admin/ux/apps/slot-demo/tab1'
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      type: 'item',
      url: '/admin/ux/apps/slot-demo/tab2'
    },
    {
      id: 'tab3',
      title: 'Tab 3',
      type: 'item',
      url: '/admin/ux/apps/slot-demo/tab3'
    },
    {
      id: 'tab4',
      title: 'Tab 4',
      type: 'item',
      url: '/admin/ux/apps/slot-demo/tab4'
    },
    {
      id: 'tab5',
      title: 'Tab 5',
      type: 'item',
      url: '/admin/ux/apps/slot-demo/tab5'
    },
    {
      id: 'tab6',
      title: 'Tab 6',
      type: 'item',
      url: '/admin/ux/apps/slot-demo/tab6'
    }
  ];

  constructor(public _UXDemoDrawerService: UXDemoDrawerService ,
    public gridService: GridService, private _fuseSidebarService: FuseSidebarService, public readonly _headerService: HeaderService) { }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this._headerService.setCurrentHeaderHeight(0);
      await this.setComplianceHeaderDocumnetHeight();
    });
  }

  private setComplianceHeaderDocumnetHeight(){
    if(this.compliance_document_header && this.compliance_document_header !==null){
      this.compliance_header_height.next(
        this.compliance_document_header.nativeElement.offsetHeight
      )
    }
  }

  displayedColumns: string[] = ['schedule', 'slotsOffered', 'slotsAvailable', 'slotsFilled', 'actions'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];

  tooltipOptions = {
    'contentType': 'string',
    'placement': 'top',
    'trigger': 'hover',
    'max-width': '152',
    'width': '152',
    'pointerEvents': 'auto'
  }

  ngOnInit() {
  }

}








