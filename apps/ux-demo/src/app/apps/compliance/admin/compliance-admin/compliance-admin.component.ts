import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderService } from '@exxat/ux';
import { ComplianceManagementHeaderLayoutService } from '../compliace_management_header.service';

@Component({
  selector: 'ryzen-compliance-admin',
  templateUrl: './compliance-admin.component.html',
  styleUrls: ['./compliance-admin.component.scss']
})
export class ComplianceAdminComponent implements OnInit {

  @ViewChild('compliance_Admin_Header') container_header: ElementRef;

  documenttypecontrol = new FormControl();
  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];

  documents = [
    { value: 'Immunization Summary', viewValue: 'Immunization Summary' },
    { value: 'MMR', viewValue: 'MMR' },
    { value: 'Flu (Influenza)', viewValue: 'Flu (Influenza)' }
  ];

  navigations = [
    {
      id: 'summary',
      title: 'Summary',
      type: 'item',
      url: '/ux/apps/compliance/admin/summary'
    },
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      //url: '/ux/apps/compliance/admin/review'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      //url: '/ux/apps/compliance/admin/notifications'
    }
  ]

  constructor(public _headerService: HeaderService, public _complainerHeaderLayoutService: ComplianceManagementHeaderLayoutService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this._headerService.setCurrentHeaderHeight(0);
      await this.setContainerHeaderHeight();
    });
  }

  private setContainerHeaderHeight(): void {
    if (this.container_header && this.container_header !== null) {
      this._complainerHeaderLayoutService.setContainerHeaderHeight(
        this.container_header.nativeElement.offsetHeight
      );
    }
  }


}
