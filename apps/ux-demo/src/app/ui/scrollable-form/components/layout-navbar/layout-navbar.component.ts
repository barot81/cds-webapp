import { Component } from '@angular/core';

@Component({
  selector: 'layout-navbar',
  templateUrl: 'layout-navbar.component.html'
})
export class LayoutnavBarComponent {
  navigations = [
    {
      id: 'menu-1',
      title: 'Menu 1',
      type: 'item',
      url: '/admin/ux/ui/scrollable-form'
    },
    {
      id: 'menu-2',
      title: 'Menu 2',
      type: 'item',
      url: '/admin/ux/ui/scrollable-form-2'
    },
    {
      id: 'menu-3',
      title: 'Menu 3',
      type: 'item',
      url: '/admin/ux/ui/scrollable-form-3'
    },
    {
      id: 'menu-4',
      title: 'Menu 4',
      type: 'item',
      url: '/admin/ux/ui/scrollable-form-4'
    }
  ];
}
