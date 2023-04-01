import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'breadcrumbs',
      title: 'Breadcrumbs',
      type: 'item',
      url: '/admin/ux/ui/navigation/breadcrumbs',
    },
    {
      id: 'vertical-tabs',
      title: 'Vertical-Tabs',
      type: 'item',
      url: '/admin/ux/ui/navigation/vertical-tabs',
    },
    {
      id: 'primary-tabs',
      title: 'Primary Navigation',
      type: 'item',
      url: '/admin/ux/ui/navigation/primary-tabs',
    },
    {
      id: 'sec-nav',
      title: 'Secondary Navigation',
      type: 'item',
      url: '/admin/ux/ui/navigation/sec-nav',
    },
  ];
}
