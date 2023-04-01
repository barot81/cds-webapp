import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navigations = [
    {
      id: 'accordian-example-one',
      title: 'Exxat Accordian Variations',
      type: 'item',
      url: '/admin/ux/ui/exxat-accordian/accordian-example-one'
    },
    {
      id: 'accordian-example-two',
      title: 'Accordian with Grid',
      type: 'item',
      url: '/admin/ux/ui/exxat-accordian/accordian-example-two'
    }
  ];
}
