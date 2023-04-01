import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService, HeaderService } from '@exxat/ux';
import { GridService } from '../../../student-grid/grid.service';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';


export interface PeriodicElement {
  mappingTo: string;
  mappingFrom: string;
  attributes: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { mappingFrom: 'Objective', mappingTo: 'Capte', attributes: 'Theme , learning activities , Assessment mathods , Level', action: '' },
  { mappingFrom: 'Objective', mappingTo: 'Capte', attributes: 'Theme , learning activities , Assessment mathods , Level', action: '' },
  { mappingFrom: 'Objective', mappingTo: 'Capte', attributes: 'Theme , learning activities , Assessment mathods , Level', action: '' },
  { mappingFrom: 'Objective', mappingTo: 'Capte', attributes: 'Theme , learning activities , Assessment mathods , Level', action: '' },
  { mappingFrom: 'Outcomes', mappingTo: 'Capte', attributes: 'Theme , learning activities , Assessment mathods , Level', action: '' },
  { mappingFrom: 'Outcomes', mappingTo: 'Capte', attributes: 'Theme , learning activities , Assessment mathods , Level', action: '' }
];


@Component({
  selector: 'ryzen-assign-attribute',
  templateUrl: './assign-attribute.component.html',
})
export class AssignAttributeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['mappingFrom', 'mappingTo', 'attributes', 'action'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  cohortList: Array<string> = [
    "Curriculam 2020",
    "Curriculam 2019",
    "Curriculam 2018",
    "Curriculam 2017",
  ];

  courseMeasuresList: Array<any> = [
    {
      heading1: 'Course Objective',
      heading2: 'Theme, Assessment method, Assessment outcome'
    },
    {
      heading1: 'Course Outcomes',
      heading2: 'Theme, Assessment method, Assessment outcome'
    },
    {
      heading1: 'Course Golas',
      heading2: 'Theme, Assessment method, Assessment outcome'
    },
    {
      heading1: 'Instructional Objectives',
      heading2: 'Theme, Assessment method, Assessment outcome'
    }
  ]
  constructor(public headerService: HeaderService, public _PlanAppDemoDrawerService: PlanAppDemoDrawerService ,
    private _fuseSidebarService: FuseSidebarService , public gridService: GridService) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(50);
    });

  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  } 

  ngOnInit() {
  }

}
