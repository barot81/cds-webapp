import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-full-page-scroll-demo-nav-bar',
  templateUrl: './full-page-scroll-demo-nav-bar.component.html',
})
export class FullPageScrollDemoNavBarComponent implements OnInit {

  navigations = [
    {
      id: 'admin-review',
      title: 'Review Admin',
      type: 'item',
      url: '/admin/ux/apps/full-page-scroll-demo/admin-review'
    },
    {
      id: 'student-review',
      title: 'Review Student',
      type: 'item',
      url: '/admin/ux/apps/full-page-scroll-demo/student-review'
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
