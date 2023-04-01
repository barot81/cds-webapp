import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'card-example-one',
      title: 'Card Example One',
      type: 'item',
      url: '/admin/ux/ui/cards/card-example-one',
    },
    {
      id: 'card-example-two',
      title: 'Card With Checkboes',
      type: 'item',
      url: '/admin/ux/ui/cards/card-example-two',
    },{
      id: 'card-example-three',
      title: 'Card With table and accordian',
      type: 'item',
      url: '/admin/ux/ui/cards/card-example-three',
    },
  ];
}
