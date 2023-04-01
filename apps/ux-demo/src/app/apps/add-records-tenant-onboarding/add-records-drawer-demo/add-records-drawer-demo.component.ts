import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-add-records-drawer-demo',
  templateUrl: './add-records-drawer-demo.component.html',
})
export class AddRecordsDrawerDemoComponent implements OnInit {


  roleList = [
    { value: "role 1", viewValue: "role 1" },
    { value: "role 2", viewValue: "role 2" }
  ];

  emailTemplateList = [
    {value : "Template 1" , viewValue : " Template 1"},
    {value : "Template 2" , viewValue : " Template 2"}
  ]

  cohortList = [
    {value : "Cohort 1" , viewValue : " Cohort 1"},
    {value : "Cohort 2" , viewValue : " Cohort 2"}
  ]

  enrollmentList = [
    {value : "Enrollment 1" , viewValue : " Enrollment 1"},
    {value : "Enrollment 2" , viewValue : " Enrollment 2"}
  ]

  graduationList =  [
    {value : "Graduation 1" , viewValue : " Graduation 1"},
    {value : "Graduation 2" , viewValue : " Graduation 2"}
  ]

  academicStandingList =  [
    {value : "Academic Standing 1" , viewValue : " Academic Standing 1"},
    {value : "Academic Standing 2" , viewValue : " Academic Standing 2"}
  ]

  groupNameList =  [
    {value : "Group Name 1" , viewValue : " Group Name 1"},
    {value : "Group Name 2" , viewValue : " Group Name 2"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
