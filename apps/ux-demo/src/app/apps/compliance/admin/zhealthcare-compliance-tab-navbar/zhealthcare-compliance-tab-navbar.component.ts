import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-zhealthcare-compliance-tab-navbar',
  templateUrl: './zhealthcare-compliance-tab-navbar.component.html',
})
export class zhealthcareComplianceTabNavbarComponent implements OnInit {

  navigations = [
    {
      id: 'summary',
      title: 'Summary',
      type: 'item',
      url: '/admin/ux/apps/compliance/admin/summary'
    },
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      //url: '/admin/ux/apps/compliance/admin/review'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      //url: '/admin/ux/apps/compliance/admin/notifications'
    }
  ]

  ngOnInit() {
    console.log("");
  }

}
