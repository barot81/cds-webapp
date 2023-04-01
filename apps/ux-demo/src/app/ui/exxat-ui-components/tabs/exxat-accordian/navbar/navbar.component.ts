import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navigations = [
    {
      id: 'accordian-example-one',
      title: 'zhealthcare Accordian Variations',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-accordian/accordian-example-one'
    },
    {
      id: 'accordian-example-two',
      title: 'Accordian with Grid',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-accordian/accordian-example-two'
    }
  ];
}
