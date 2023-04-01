import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'Exxat-Forms-UI',
      title: 'Exxat Forms UI',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/exxat-forms-ui',
    },
    {
      id: 'layout',
      title: 'Layout',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/layout',
    },
    {
      id: 'workflow',
      title: 'Workflow',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/workflow',
    },
    {
      id: 'response',
      title: 'Response',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/response',
    },
    {
      id: 'forms-ingterface',
      title: 'Product - Exxat Forms Interface',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/forms-ingterface',
    },
    {
      id: 'form-request',
      title: 'Form Request',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/form-request',
    },
    {
      id: 'form-response',
      title: 'Response',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/form-response',
    },
    {
      id: 'form-event',
      title: 'Form Event',
      type: 'item',
      url: '/admin/ux/ui/exxat-forms/form-event',
    },
  ];
}
