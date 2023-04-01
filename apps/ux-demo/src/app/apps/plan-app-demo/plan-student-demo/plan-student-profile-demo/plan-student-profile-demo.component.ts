import { Component, OnInit } from '@angular/core';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';

@Component({
  selector: 'ryzen-plan-student-profile-demo',
  templateUrl: './plan-student-profile-demo.component.html',
  styleUrls: ['./plan-student-profile-demo.component.scss']
})
export class PlanStudentProfileDemoComponent implements OnInit {

  workexperiences = [{ schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" }
  ];
  
  panelOpenState = false;


  constructor(public _PlanAppDemoDrawerService: PlanAppDemoDrawerService) { }

  ngOnInit() {
  }

}
