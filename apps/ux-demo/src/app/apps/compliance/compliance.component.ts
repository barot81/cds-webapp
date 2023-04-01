import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseSidebarService } from '@exxat/ux';

@Component({
  selector: 'ryzen-compliance',
  templateUrl: './compliance.component.html',
})
export class ComplianceComponent implements OnInit {
    /**
   * Constructor
   *
   * @param {FuseSidebarService} _fuseSidebarService
   */

  status = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];
  constructor( private _fuseSidebarService: FuseSidebarService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
