import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'typography',
      title: 'Typography',
      type: 'item',
      url: '/admin/ux/ui/typography/typography',
    },
    {
      id: 'inline-text-elements',
      title: 'Inline Text Elements',
      type: 'item',
      url: '/admin/ux/ui/typography/inline-text-elements',
    },
    // {
    //   id: 'blockquotes-lists',
    //   title: 'Blockquotes & Lists',
    //   type: 'item',
    //   url: '/admin/ux/ui/typography/blockquotes-lists',
    // },
    {
      id: 'helpers',
      title: 'Helpers',
      type: 'item',
      url: '/admin/ux/ui/typography/helpers',
    },
    {
      id: 'media-query',
      title: 'Media Query',
      type: 'item',
      url: '/admin/ux/ui/typography/media-query',
    },
  ];
}
