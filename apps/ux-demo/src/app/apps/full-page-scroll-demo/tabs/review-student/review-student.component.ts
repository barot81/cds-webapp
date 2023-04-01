import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-review-student',
  templateUrl: './review-student.component.html',
})
export class ReviewStudentComponent implements OnInit {

  status = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];

  constructor(private _fuseSidebarService: FuseSidebarService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }


}
