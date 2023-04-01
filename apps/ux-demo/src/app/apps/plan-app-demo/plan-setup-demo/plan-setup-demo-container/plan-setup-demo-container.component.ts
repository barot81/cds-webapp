import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';

export interface navigationItem {
  title: string;
  url: string;
}

@Component({
  selector: 'ryzen-plan-setup-demo-container',
  templateUrl: './plan-setup-demo-container.component.html',
})
export class PlanSetupDemoContainerComponent implements OnInit {

  activeTab: string;

  navigations: Array<navigationItem> = [
    {
      title: 'Course Measures',
      url: '/admin/ux/apps/plan-setup-demo/course-measures'
    },
    {
      title: 'Curriculum Attributes',
      url: '/admin/ux/apps/plan-setup-demo/curriculum-attributes'
    },
    {
      title: 'Mapping Setup',
      url: '/admin/ux/apps/plan-setup-demo/assign-attribute'
    }
  ]
  constructor(private readonly _fuseSidebarService: FuseSidebarService) {
    this.activeTab = this.navigations[0].title;
  }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  activateNavigation(item: navigationItem) {
    this.activeTab = item.title;
  }
}
