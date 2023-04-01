import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'button-toggle',
      title: 'Buttons Toggle',
      type: 'item',
      url: '/admin/ux/ui/exxat-buttons/button-toggle',
    },
    {
      id: 'show-more',
      title: 'Show More Button',
      type: 'item',
      url: '/admin/ux/ui/exxat-buttons/show-more',
    },
    {
      id: 'generic-buttons',
      title: 'Generic Buttons',
      type: 'item',
      url: '/admin/ux/ui/exxat-buttons/generic-buttons',
    },
    {
      id: 'status-badges',
      title: 'Status Badges',
      type: 'item',
      url: '/admin/ux/ui/exxat-buttons/status-badges',
    },
    // {
    //   id: 'spinner-buttons',
    //   title: 'Buttons With Spinner',
    //   type: 'item',
    //   url: '/admin/ux/ui/exxat-buttons/spinner-buttons',
    // },
    {
      id: 'menu-buttons',
      title: 'Three Dot Menu',
      type: 'item',
      url: '/admin/ux/ui/exxat-buttons/menu-buttons',
    },
  ];
}
