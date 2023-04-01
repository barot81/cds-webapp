import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-placement-tab-nav-bar',
  templateUrl: './placement-tab-nav-bar.component.html',
})
export class PlacementTabNavBarComponent implements OnInit {

  navigations = [
    {
      id: 'configuration',
      title: 'Configuration',
      type: 'item',
      url: '/admin/ux/apps/placement/configuration'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/ux/apps/placement/dashboard'
    },
    {
      id: 'manage-slots',
      title: 'Manage Slots',
      type: 'item',
      url: '/admin/ux/apps/placement/manage-slots'
    },
    
    {
      id: 'wishlists',
      title: 'Wishlists',
      type: 'item',
      url: '/admin/ux/apps/placement/wishlists'
    },
    {
      id: 'manage-placements',
      title: 'Manage Placements',
      type: 'item',
      url: '/admin/ux/apps/placement/manage-placements'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      type: 'item',
      url: '/admin/ux/apps/placement/notifications'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
