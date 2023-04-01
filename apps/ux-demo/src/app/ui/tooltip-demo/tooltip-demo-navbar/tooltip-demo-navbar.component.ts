import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-tooltip-demo-navbar',
  templateUrl: './tooltip-demo-navbar.component.html',
})
export class TooltipDemoNavbarComponent implements OnInit {


  navigations = [
    {
      id: 'tooltip-example-one',
      title: 'Tooltip with Component',
      type: 'item',
      url: '/admin/ux/ui/tooltip-demo/tooltip-example-one'
    },
    {
      id: 'tooltip-example-two',
      title: 'Tooltip with template',
      type: 'item',
      url: '/admin/ux/ui/tooltip-demo/tooltip-example-two'
    },
    {
      id: 'tooltip-example-three',
      title: 'Tooltip with string',
      type: 'item',
      url: '/admin/ux/ui/tooltip-demo/tooltip-example-three'
    },
    {
      id: 'tooltip-example-four',
      title: 'Tooltip With Card',
      type: 'item',
      url: '/admin/ux/ui/tooltip-demo/tooltip-example-four'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
