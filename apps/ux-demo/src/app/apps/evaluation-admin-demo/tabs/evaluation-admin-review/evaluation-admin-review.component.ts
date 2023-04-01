import { Component, OnInit } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-evaluation-admin-review',
  templateUrl: './evaluation-admin-review.component.html',
  styleUrls: ['./evaluation-admin-review.component.scss']
})
export class EvaluationAdminReviewComponent implements OnInit {


  status = new FormControl();
  option = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];

  constructor(private _fuseSidebarService: FuseSidebarService, public headerService: HeaderService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }


}
