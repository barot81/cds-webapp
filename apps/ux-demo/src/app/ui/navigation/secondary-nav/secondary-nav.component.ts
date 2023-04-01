import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-secondary-nav',
  templateUrl: './secondary-nav.component.html',
})
export class SecondaryNavComponent implements OnInit {

  navigations = [
    {
      id: 'first-tab',
      title: 'First Tab',
      type: 'item',
      url: '/admin/ux/ui/navigation'
    },
    {
      id: 'second-tab',
      title: 'Second Tab',
      type: 'item',
      url: '/admin/ux/ui/navigation1'
    },
    {
      id: 'third-tab',
      title: 'Third Tab',
      type: 'item',
      url: '/admin/ux/ui/navigation2'
    },
    {
      id: 'fourth-tab',
      title: 'Fourth Tab',
      type: 'item',
      url: '/admin/ux/ui/navigation3'
    },
    {
      id: 'fifth-tab',
      title: 'Fifth Tab',
      type: 'item',
      url: '/admin/ux/ui/navigation4'
    }
   
  ]

  constructor() { }

  ngOnInit() {
  }

}
