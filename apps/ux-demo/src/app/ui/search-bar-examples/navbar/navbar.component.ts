import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'simple-search-bar',
      title: 'Simple Search Bar',
      type: 'item',
      url: '/admin/ux/ui/search-bar/simple-search-bar',
    },
    {
      id: 'search-with-drop-down',
      title: 'Search Bar With Dropdown',
      type: 'item',
      url: '/admin/ux/ui/search-bar/search-with-drop-down',
    },
    {
      id: 'search-with-auto-complete',
      title: 'Search Bar With Autocomplete',
      type: 'item',
      url: '/admin/ux/ui/search-bar/search-with-auto-complete',
    },
  ];
}
