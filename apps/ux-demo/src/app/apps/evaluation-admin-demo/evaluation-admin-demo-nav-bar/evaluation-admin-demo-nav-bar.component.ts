import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-evaluation-admin-demo-nav-bar',
  templateUrl: './evaluation-admin-demo-nav-bar.component.html',
})
export class EvaluationAdminDemoNavBarComponent implements OnInit {

  navigations = [
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      url: '/admin/ux/apps/evaluation-admin-demo/review'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
