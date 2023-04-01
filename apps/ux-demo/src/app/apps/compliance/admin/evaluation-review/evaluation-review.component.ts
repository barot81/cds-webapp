import { Component, OnInit } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-evaluation-review',
  templateUrl: './evaluation-review.component.html',
})
export class EvaluationReviewComponent implements OnInit {

  status = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];
  
  constructor( private _fuseSidebarService: FuseSidebarService, public headerService: HeaderService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
