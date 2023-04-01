import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    // {
    //   id: 'example-one',
    //   title: 'File Viewer - Guideline With Buttons in Overlay',
    //   type: 'item',
    //   url: '/admin/ux/ui/exxat-overlay/file-viewer-guideline-with-buttons',
    // },
    {
      id: 'example-two',
      title: 'File Viewer With Guideline in Overlay',
      type: 'item',
      url: '/admin/ux/ui/exxat-overlay/file-viewer-guideline',
    },
    {
      id: 'example-three',
      title: 'File Viewer in Overlay',
      type: 'item',
      url: '/admin/ux/ui/exxat-overlay/file-viewer',
    },
    {
      id: 'example-four',
      title: 'Pass Component in Overlay',
      type: 'item',
      url: '/admin/ux/ui/exxat-overlay/component',
    },
  ];
}
