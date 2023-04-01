import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zhealthcare-app-student-student-info',
  templateUrl: './student-student-info.component.html',
  styleUrls: ['./student-student-info.component.scss']
})
export class StudentStudentInfoComponent implements OnInit {

  workexperiences = [{ schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" }
  ];
  
  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

}