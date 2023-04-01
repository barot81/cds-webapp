import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'academic-info',
      title: 'Academic Info',
      type: 'item',
      url: '/admin/ux/apps/sticky-table-header-layout/academic-info',
    },
    {
      id: 'student-info',
      title: 'student-info',
      type: 'item',
      url: '/admin/ux/apps/sticky-table-header-layout/student-info',
    },
    {
      id: 'contact',
      title: 'Contact',
      type: 'item',
      url: '/admin/ux/apps/sticky-table-header-layout/contact',
    },
  ];
}
