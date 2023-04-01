import { Component } from '@angular/core';
import { BreadCrumbType } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  _breadCrumbType = BreadCrumbType;

  breadcrumbs = [
    { title: 'Students', route: '/admin/profile/search', order: 0 },
    {
      title: 'Student Details',
      route:
        '/admin/profile/details/40324c3e-f36b-1410-8d59-00ffffffffff/academics',
      order: 1,
    },
    {
      title: 'Student Info',
      route: '/admin/profile/details/40324c3e-f36b-1410-8d59-00ffffffffff/info',
      order: 2,
    },
  ];

  onLickClick($event: any) {
    console.log($event);
  }
}
