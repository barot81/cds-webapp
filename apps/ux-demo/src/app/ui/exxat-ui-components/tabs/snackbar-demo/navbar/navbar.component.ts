import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'with-close',
      title: 'With Close',
      type: 'item',
      url: '/admin/ux/ui/snackbar/with-close',
    },
    {
      id: 'with-action',
      title: 'With Action',
      type: 'item',
      url: '/admin/ux/ui/snackbar/with-action',
    },
    {
      id: 'without-action',
      title: 'Without Action',
      type: 'item',
      url: '/admin/ux/ui/snackbar/without-action',
    },
    {
      id: 'unsuccess',
      title: 'Snackbar Unsuccess',
      type: 'item',
      url: '/admin/ux/ui/snackbar/unsuccess',
    },
  ];
}
