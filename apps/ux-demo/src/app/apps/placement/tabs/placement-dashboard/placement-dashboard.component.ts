import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';

@Component({
  selector: 'ryzen-placement-dashboard',
  templateUrl: './placement-dashboard.component.html',
  styleUrls: ['./placement-dashboard.component.scss']
})
export class PlacementDashboardComponent implements OnInit {

  leftBarNavigationList = [
    { title: 'Dashboard' },
    { title: 'Reports' },
    { title: 'Placement Report' }
  ];
  constructor(private _fuseSidebarService: FuseSidebarService) {
  }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
