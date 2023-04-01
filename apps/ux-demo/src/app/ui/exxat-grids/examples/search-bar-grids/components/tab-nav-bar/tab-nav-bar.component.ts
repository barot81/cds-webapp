import { Component } from '@angular/core';

@Component({
  selector: 'exxat-tab-nav-bar',
  templateUrl: './tab-nav-bar.component.html',
})
export class TabNavBarComponenent {
  navigations = [
    {
      id: 'with-sticky-header',
      title: 'With Sticky Header',
      type: 'item',
      url: '/admin/ux/ui/search-bar-grids/with-sticky-header',
    },
    {
      id: 'without-sticky-header',
      title: 'Without Sticky Header',
      type: 'item',
      url: '/admin/ux/ui/search-bar-grids/without-sticky-header',
    },
  ];
}
