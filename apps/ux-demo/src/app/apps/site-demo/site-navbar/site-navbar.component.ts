import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-site-navbar',
  templateUrl: './site-navbar.component.html',
})
export class SiteNavbarComponent implements OnInit {

 
  navigations = [
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/admin/ux/apps/site/about'
    },
    {
      id: 'contracts',
      title: 'Contracts',
      type: 'item',
      url: '/admin/ux/apps/site/contracts'
    },
    {
      id: 'clinical-personal',
      title: 'Clinical Personal',
      type: 'item',
      url: '/admin/ux/apps/site/clinical-personal'
    },
    
    {
      id: 'location',
      title: 'Location(54)',
      type: 'item',
      url: '/admin/ux/apps/site/locations'
    },
    {
      id: 'placement',
      title: 'Placement',
      type: 'item',
      url: '/admin/ux/apps/site/placement'
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/admin/ux/apps/site/notification'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
