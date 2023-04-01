import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { GridService } from '../../../../student-grid/grid.service';
import { FormControl } from '@angular/forms';
export interface PeriodicElement {
  rank: string,
  statusClass:string,
  siteDetails: string;
  distance: string;
  setting: string;
  studentpreferences: string;
  studentplaced: string;
  slotsavailable: string;
  action:string;
  ranktype:string;
  siteDetailTitle:string;
  address:string;
  viewNotes:string;
  getStarted:string;
  expiring:string;
  badgeValue1:string;
  badgeValue2:string;
  badgeValue3:string;
  matIconValue:string;
  matIconValue2:string;
  text:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { rank: 'Rank 1',viewNotes: 'View notes' , address: '3301 FM3009, Schertz, TX 78154, USA' , siteDetailTitle: 'Ageless Medical Center', ranktype: '(slot)' ,siteDetails: "Emergency Medicine", distance: "21.1 miles", setting: "Onology", studentpreferences: "60", studentplaced: "5", slotsavailable: "3",action: '' ,statusClass:"success",getStarted: 'getstarted', expiring: 'expiring',badgeValue1: 'FCFS',badgeValue2: '1 student: 1 CI',badgeValue3:'This is a tentative slot',matIconValue: 'warning' ,matIconValue2:'check_circle', text:'Location not assigned'},
  { rank: 'Rank 2',viewNotes: 'View notes' , address: '' ,siteDetailTitle: 'Huntington Hospital ',ranktype: '(site)', siteDetails: "Emergency Medicine", distance: "", setting: "Onology", studentpreferences: "40", studentplaced: "7", slotsavailable: "3/5" ,action: '' ,statusClass:"warning" ,getStarted: '',badgeValue1: '',badgeValue2: '' , expiring: '' ,badgeValue3:'',matIconValue: '',matIconValue2:'',text:'' },
  { rank: '',viewNotes: '' ,address: '' ,siteDetailTitle: ' ', ranktype: '',siteDetails: "Emergency Medicine", distance: "21.5 miles", setting: "Onology", studentpreferences: "45", studentplaced: "9", slotsavailable: "1/2" ,action: '' ,statusClass:"",getStarted: '' ,badgeValue1: '',badgeValue2: ''  , expiring: '',badgeValue3:'' ,matIconValue: '' ,matIconValue2:'',text:'' },
  {  rank: '',viewNotes: '' ,address: '' ,siteDetailTitle: ' ',ranktype: '',  siteDetails: "Emergency Medicine", distance: "15 miles", setting: " Onology", studentpreferences: "30", studentplaced: "2", slotsavailable: "3" ,action: '' ,statusClass:"error" ,getStarted: '',badgeValue1: '',badgeValue2: '' , expiring: '' ,badgeValue3:'' ,matIconValue: '',matIconValue2:'' ,text:'' },
];


@Component({
  selector: 'ryzen-rotation-drawer',
  templateUrl: './rotation-drawer.component.html',
  styleUrls: ['./rotation-drawer.component.scss']
})
export class RotationDrawerComponent implements OnInit {

  sitecontrol = new FormControl();
  settingcontrol = new FormControl();
  statuscontrol = new FormControl();
  slotcontrol =  new FormControl();

  settings = [
    { value: "Setting 1", viewValue: "Setting 1" },
    { value: "Setting 2", viewValue: "Setting 2" },
    { value: "Setting 3", viewValue: "Setting 3" },
  ];

  sites = [
    { value: 'Catagory 1', viewValue: 'Catagory 1' },
    { value: 'Catagory 2', viewValue: 'Catagory 2' },
    { value: 'Catagory 3', viewValue: 'Catagory 3' }
  ];

  status = [
    { value: 'Status 1', viewValue: 'Status 1' },
    { value: 'Status 2', viewValue: 'Status 2' },
    { value: 'Status 3', viewValue: 'Status 3' }
  ];

  slots = [
    { value: 'Type 1', viewValue: 'Type 1' },
    { value: 'Type 2', viewValue: 'Type 2' },
    { value: 'Type 3', viewValue: 'Type 3' }
  ];

  displayedColumns: string[] = ['rank', 'siteDetails', 'distance', 'setting', 'studentpreferences', 'studentplaced' , 'slotsavailable' , 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(public gridService: GridService) { }

  ngOnInit() {
  }

}
