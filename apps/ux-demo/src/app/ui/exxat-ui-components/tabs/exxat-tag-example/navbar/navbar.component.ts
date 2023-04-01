import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'example-one',
      title: 'Without Apply Button',
      type: 'item',
      url: '/admin/ux/ui/exxat-tags/example-one',
    },
    {
      id: 'example-two',
      title: 'With Apply Button',
      type: 'item',
      url: '/admin/ux/ui/exxat-tags/example-two',
    },
    {
      id: 'example-two',
      title: 'Chips View Example',
      type: 'item',
      url: '/admin/ux/ui/exxat-tags/example-three',
    },
  ];
}
