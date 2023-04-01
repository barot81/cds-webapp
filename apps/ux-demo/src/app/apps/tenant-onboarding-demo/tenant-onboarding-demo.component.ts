

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../student-grid/grid.service';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';

export interface PeriodicElement {
  name: string;
  shortName: string;
  tenantId: string;
  timeZone: string;
  progress: string;
  status : string;
  institutionAddress:string;
  action : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { shortName: 'USC', name: 'Institute Name 1', tenantId: 'Tenant Id', timeZone: 'UTC+05:30' , progress: 'Completed (100%)' , status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code' , action:''},
  { shortName: 'IN2', name: 'Institute Name 2', tenantId: 'Tenant Id', timeZone: 'UTC+05:30' , progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'IN3', name: 'Institute Name 3', tenantId: 'Tenant Id', timeZone: 'UTC+05:30' , progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 4', tenantId: 'Tenant Id', timeZone: 'Time Zone', progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 5', tenantId: 'Tenant Id', timeZone: 'Time Zone' , progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 6', tenantId: 'Tenant Id', timeZone: 'Time Zone', progress: 'Completed (100%)' , status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 7', tenantId: 'Tenant Id', timeZone: 'Time Zone', progress: 'Completed (100%)' , status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 8', tenantId: 'Tenant Id', timeZone: 'Time Zone' , progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 9', tenantId: 'Tenant Id', timeZone: 'Time Zone', progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''},
  { shortName: 'USC', name: 'Institute Name 10', tenantId: 'Tenant Id', timeZone: 'Time Zone' , progress: 'Completed (100%)', status: 'Inactive', institutionAddress: 'Address line 1, Address line 2, City, State, Country, Zip code', action:''}
];

@Component({
  selector: 'ryzen-tenant-onboarding-demo',
  templateUrl: './tenant-onboarding-demo.component.html',
  styleUrls: ['./tenant-onboarding-demo.component.scss']
})
export class TenantOnboardingDemoComponent implements OnInit {


  SearchFields = [
    { value: 'Institute Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];

  displayedColumns: string[] = ['name','shortName',  'tenantId', 'timeZone' , 'progress' , 'status' , 'institutionAddress' , 'action'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(public gridService: GridService, public _UXDemoDrawerService: UXDemoDrawerService) { }

 
  ngOnInit() {
  }

}





