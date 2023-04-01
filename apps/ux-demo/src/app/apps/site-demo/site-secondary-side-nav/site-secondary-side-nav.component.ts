import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-site-secondary-side-nav',
  templateUrl: './site-secondary-side-nav.component.html'
})
export class SiteSecondarySideNavComponent implements OnInit {

  navigations = [
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/admin/ux/apps/site/locations'
    },
    {
      id: 'Association',
      title: 'Association',
      type: 'item',
      url: '/admin/ux/apps/site/association'
    },
    {
      id: 'Communications',
      title: 'Communications',
      type: 'item',
      url: '/admin/ux/apps/site/Communications'
    },

    {
      id: 'Interventions',
      title: 'Interventions',
      type: 'item',
      url: '/admin/ux/apps/site/Interventions'
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
