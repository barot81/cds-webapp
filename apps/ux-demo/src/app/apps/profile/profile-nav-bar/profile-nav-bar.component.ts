import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './profile-nav-bar.component.html',
})
export class ProfileNavbarComponent {
  navigations = [
    {
      id: 'details',
      title: 'Profile',
      type: 'item',
      url: '/admin/ux/apps/student/details',
    },
    {
      id: 'teaching',
      title: 'Teaching',
      type: 'item',
      url: '/admin/ux/apps/student/teaching',
    },
  ];
}
