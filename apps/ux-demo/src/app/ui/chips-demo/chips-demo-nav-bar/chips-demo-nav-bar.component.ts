import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-chips-demo-nav-bar',
  templateUrl: './chips-demo-nav-bar.component.html',
})
export class ChipsDemoNavBarComponent implements OnInit {
  navigations = [
    {
      id: 'chips-with-custom-input',
      title: 'Chips With Custom input',
      type: 'item',
      url: '/admin/ux/ui/chips-demo/chips-with-custom-input',
    },
    {
      id: 'chips-without-custom-input',
      title: 'Chips Without Custom input',
      type: 'item',
      url: '/admin/ux/ui/chips-demo/chips-without-custom-input',
    },
    {
      id: 'setting-chip-demo',
      title: 'Setting Chips',
      type: 'item',
      url: '/admin/ux/ui/chips-demo/setting-chip-demo',
    },
    {
      id: 'specialized-chip',
      title: 'Specialized Chips',
      type: 'item',
      url: '/admin/ux/ui/chips-demo/specialized-chip',
    },
    {
      id: 'chips-selection-form',
      title: 'Chips Selection Form',
      type: 'item',
      url: '/admin/ux/ui/chips-demo/chips-selection-form',
    }
  ];

  constructor() {}

  ngOnInit() {}
}
