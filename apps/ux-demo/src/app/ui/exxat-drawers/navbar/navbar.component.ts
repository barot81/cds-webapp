import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'drawer-sizes',
      title: 'Drawer Sizes',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-drawers/drawer-sizes',
    },
    {
      id: 'multi-drawer',
      title: 'Multi Drawer',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-drawers/multi-drawer',
    },
    {
      id: 'drawer-with-cards',
      title: 'Drawer With Cards',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-drawers/drawer-with-cards',
    },
    {
      id: 'drawer-with-two-column',
      title: 'Drawer With Two Column',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-drawers/drawer-with-two-column',
    },
    {
      id: 'drawer-with-sticky-elements',
      title: 'Drawer With Sticky Elements',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-drawers/drawer-with-sticky-elements',
    },
    {
      id: 'drawer-with-highlight-menu',
      title: 'Drawer With Highlight Menu',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-drawers/drawer-with-highlight-menu',
    },
  ];
}
