

import { Component, OnInit , ViewChild} from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';

@Component({
  selector: 'ryzen-plan-student-demo-plan',
  templateUrl: './plan-student-demo.component.html',
})
export class PlanStudentDemoPlanComponent implements OnInit {

  navigations = [
    {
      id: 'profile-demo',
      title: 'Profile',
      type: 'item',
      url: '/admin/ux/apps/profile-demo'
    },
    {
      id: 'tab2',
      title: 'Teaching',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab2'
    },
    {
      id: 'tab3',
      title: 'Service',
      type: 'item',
      url: '/admin/ux/apps/event-schedule-demo'
    },
    {
      id: 'tab4',
      title: 'Scholership',
      type: 'item',
      url: '/admin/ux/apps/resources-demo'
    },
    {
      id: 'tab5',
      title: 'Associated students',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab5'
    }
  ];


  constructor(private _fuseSidebarService: FuseSidebarService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }


}
