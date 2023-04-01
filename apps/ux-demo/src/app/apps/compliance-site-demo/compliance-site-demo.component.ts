import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseSidebarService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-compliance-site-demo',
  templateUrl: './compliance-site-demo.component.html',
  styleUrls: ['./compliance-site-demo.component.scss']
})
export class ComplianceSiteDemoComponent implements OnInit {

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
