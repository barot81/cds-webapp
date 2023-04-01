import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-plan-student-basic-info-drawer',
  templateUrl: './plan-student-basic-info-drawer.component.html',
})
export class PlanStudentBasicInfoDrawerComponent implements OnInit {


  raceList = [
    { id: 'Hispanic/Latino of any race', value: 'Hispanic/Latino of any race' },
    { id: 'Native Hawaiian or other Pacific Islander', value: 'Native Hawaiian or other Pacific Islander' },
    { id: 'American Indian/Alaskan Native', value: 'American Indian/Alaskan Native' },
    { id: 'White Asian', value: 'White Asian' },
    { id: 'Two or more races', value: 'Two or more races' },
    { id: 'Black or African-American', value: 'Black or African-American' },
    { id: 'Unknown', value: 'Unknown' },
    { id: 'Prefer not to answer', value: 'Prefer not to answer' }
  ];

  
   genderList = [
    { id: 'Male', value: 'Male' },
    { id: 'Female', value: 'Female' },
    { id: 'Transgender', value: 'Transgender' },
    { id: 'NOT Reported ', value: 'NOT Reported ' },
    { id: 'NA', value: 'NA' },
    { id: 'Unspecified', value: 'Unspecified' },
    { id: 'Non-Binary ', value: 'Non-Binary ' },
    { id: 'Prefer not to state', value: 'Prefer not to state' }
  ];



  constructor() { }

  ngOnInit() {
  }

}
