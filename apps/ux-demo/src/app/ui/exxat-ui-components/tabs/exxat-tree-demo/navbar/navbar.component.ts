import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'example-one',
      title: 'Tree with checkbox and add function',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-one',
    },
    {
      id: 'example-two',
      title: 'Tree without checkbox and add function',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-two',
    },
    {
      id: 'example-three',
      title: 'Tree with primary and secondary title',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-three',
    },
    {
      id: 'example-four',
      title: 'Tree with right side value',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-four',
    },
    {
      id: 'example-five',
      title: 'Tree with edit icon and menu icon on hover',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-five',
    },
    {
      id: 'example-six',
      title: 'Tree with drag and drop',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-six',
    },
    {
      id: 'example-seven',
      title: 'Tree with multiple string title',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-seven',
    },
    {
      id: 'example-eight',
      title: 'Tree with multiple child nodes',
      type: 'item',
      url: '/admin/ux/ui/exxat-trees/example-eight',
    },
  ];
}
