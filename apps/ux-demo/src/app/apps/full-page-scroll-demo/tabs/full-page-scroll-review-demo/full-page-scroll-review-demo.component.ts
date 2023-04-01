import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-full-page-scroll-review-demo',
  templateUrl: './full-page-scroll-review-demo.component.html',
  styleUrls: ['./full-page-scroll-review-demo.component.scss']
})
export class FullPageScrollReviewDemoComponent implements OnInit {

  status = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];

  constructor(private _fuseSidebarService: FuseSidebarService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }


}
