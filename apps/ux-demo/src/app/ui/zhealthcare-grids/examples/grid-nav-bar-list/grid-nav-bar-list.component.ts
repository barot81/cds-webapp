import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-grid-nav-bar-list',
  templateUrl: './grid-nav-bar-list.component.html',
})
export class GridNavBarListComponent implements OnInit {

  navigations = [
    {
      id: 'about',
      title: 'Sites',
      type: 'item',
      url: '/admin/ux/ui/grid-with-tabs'
    },
    {
      id: 'contracts',
      title: 'Contracts',
      type: 'item',
      url: '/admin/ux/apps/site/contracts'
    },
    {
      id: 'location',
      title: 'Location(54)',
      type: 'item',
      url: '/admin/ux/apps/site/locations'
    },
    {
      id: 'expiring-contracts',
      title: 'Expiring Contracts(22)',
      type: 'item',
      url: '/admin/ux/apps/site/contracts'
    },
    {
      id: 'expired-contracts',
      title: 'Expired Contracts(22)',
      type: 'item',
      url: '/admin/ux/apps/site/contracts'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
