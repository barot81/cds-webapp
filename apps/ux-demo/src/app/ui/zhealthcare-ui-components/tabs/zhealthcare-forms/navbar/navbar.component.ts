import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'zhealthcare-Forms-UI',
      title: 'zhealthcare Forms UI',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/zhealthcare-forms-ui',
    },
    {
      id: 'layout',
      title: 'Layout',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/layout',
    },
    {
      id: 'workflow',
      title: 'Workflow',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/workflow',
    },
    {
      id: 'response',
      title: 'Response',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/response',
    },
    {
      id: 'forms-ingterface',
      title: 'Product - zhealthcare Forms Interface',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/forms-ingterface',
    },
    {
      id: 'form-request',
      title: 'Form Request',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/form-request',
    },
    {
      id: 'form-response',
      title: 'Response',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/form-response',
    },
    {
      id: 'form-event',
      title: 'Form Event',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-forms/form-event',
    },
  ];
}
