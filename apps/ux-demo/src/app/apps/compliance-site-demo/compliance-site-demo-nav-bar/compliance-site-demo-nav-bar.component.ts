import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-compliance-site-demo-nav-bar',
  templateUrl: './compliance-site-demo-nav-bar.component.html',
})
export class ComplianceSiteDemoNavBarComponent implements OnInit {

  navigations = [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/admin/ux/apps/compliance-site-demo/profile'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      type: 'item',
      url: '/admin/ux/apps/compliance-site-demo/compliance'
    },
    {
      id: 'contact',
      title: 'Contact',
      type: 'item',
      url: '/admin/ux/apps/compliance-site-demo/contact'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
