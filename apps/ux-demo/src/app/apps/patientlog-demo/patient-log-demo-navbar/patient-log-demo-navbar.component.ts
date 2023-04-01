import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-patient-log-demo-navbar',
  templateUrl: './patient-log-demo-navbar.component.html',
})
export class PatientLogDemoNavbarComponent implements OnInit {

  navigations = [
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      url: '/admin/ux/apps/patientlog-demo/review'
    },
    {
      id: 'statistics',
      title: 'Statistics',
      type: 'item',
      url: '/admin/ux/apps/patientlog-demo/statistics'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
