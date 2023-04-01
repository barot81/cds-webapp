import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-inner-page-primary-navbar',
  templateUrl: './inner-page-primary-navbar.component.html',
})
export class InnerPagePrimaryNavbarComponent implements OnInit {

  
  navigations = [
    {
      id: 'tab1',
      title: 'Slot',
      type: 'item',
      url: '/admin/ux/apps/inner-page-demo/tab1'
    },
    {
      id: 'Tab2',
      title: 'Site',
      type: 'item',
      url: '/admin/ux/apps/site/contracts'
    },
    {
      id: 'Tab3',
      title: 'My Request',
      type: 'item',
      url: '/admin/ux/apps/site/clinical-personal'
    },
    
    {
      id: 'Tab4',
      title: 'Tab4',
      type: 'item',
      url: '/admin/ux/apps/site/locations'
    },
    {
      id: 'Tab5',
      title: 'Tab5',
      type: 'item',
      url: '/admin/ux/apps/site/placement'
    },
    {
      id: 'Tab6',
      title: 'Tab6',
      type: 'item',
      url: '/admin/ux/apps/site/notification'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
