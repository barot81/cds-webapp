
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileCard, FileConfiguration, FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { BreadCrumbType, CarouselEvent, FuseSidebarService } from '@zhealthcare/ux';
import { SecurityContext } from '@zhealthcare/fusion/models';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../student-grid/grid.service';

interface HeaderContentItem {
    id: string;
    title: string;
}

export interface PeriodicElement {
    form:string;
    weightage: string;
    publishDate: string;
    midtermDue: string;
    finalDueDate:string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    { publishDate: '',form: '', weightage: '', midtermDue: '' ,finalDueDate:''},
  ];

@Component({
  selector: 'configuration-course-offering',
  templateUrl: './configuration-course-offering.component.html',
  styleUrls: ['./configuration-course-offering.component.scss']
})
export class ConfigurationCourseOfferingComponent {

  tooltipOptions = {
    'contentType': 'string',
    'placement': 'right',
    'trigger': 'hover',
    'max-width': '450',
    'width': 'auto',
    'pointerEvents': 'auto'
}


  fileConfiguration: FileConfiguration;
  uxDemoAPPSecurityContext: SecurityContext;

  constructor( private _fuseSidebarService: FuseSidebarService, public _UXDemoDrawerService: UXDemoDrawerService,public gridService: GridService) {
  }


  //table
  displayedColumns: string[] = ['form','weightage','publishDate',  'midtermDue', 'finalDueDate' , 'status' , 'action'];
 
  dataSourceRight = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  //breadcrumbs
  _breadCrumbType = BreadCrumbType;

  breadcrumbs = [
    { title: 'Course offering', route: '/admin/profile/search', order: 0 },
    { title: 'PT509 - Clinical Medicine I', route: '/admin/profile/details/40324c3e-f36b-1410-8d59-00ffffffffff/academics', order: 1 }
  ]

//sidebar options exapand collapse
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }  



  // toogle sidebar in small screens
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('configuration-page-sidebar').toggleFold();
    }


}




