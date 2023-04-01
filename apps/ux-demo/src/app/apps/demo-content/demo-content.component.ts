import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zhealthcare-app-demo-content',
  templateUrl: './demo-content.component.html',
})
export class DemoContentComponent implements OnInit {

  staffs = [
    { firstName: "Gregory", lastName: "Hawkins", des: "Advisor", src: "assets/images/avatars/alice.jpg" },
    { firstName: "Newman", lastName: "Garry", des: "Advisor", src: "assets/images/avatars/andrew.jpg" }
  ]

  required = [
    { name: "Surgery" },
    { name: "Internal Medicine" },
    { name: "Family Medicine" },
    { name: "Endocrine" }
  ];

  notRequired = [
    { name: "Radiology" },
    { name: "CT Surgery" },
    { name: "Pediatrics" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
