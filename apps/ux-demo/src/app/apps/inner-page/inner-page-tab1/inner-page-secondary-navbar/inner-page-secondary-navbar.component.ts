import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-inner-page-secondary-navbar',
  templateUrl: './inner-page-secondary-navbar.component.html',
})
export class InnerPageSecondaryNavbarComponent implements OnInit {

 
  navigations = [
    {
      id: 'one',
      title: 'Setting',
      type: 'item',
      url: '/admin/ux/apps/inner-page-demo/tab1/category1'
    },
    {
      id: 'Two',
      title: 'Location',
      type: 'item',
      url: '/admin/ux/apps/inner-page-demo/tab1/category2'
    },
    {
      id: 'Three',
      title: 'Slot Type',
      type: 'item',
      url: '/admin/ux/apps/inner-page-demo/tab1/category3'
    },
   
  ]

  constructor() { }

  ngOnInit() {
  }

}
