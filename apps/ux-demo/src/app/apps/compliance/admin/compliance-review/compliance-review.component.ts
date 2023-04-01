import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';
import { ComplianceManagementHeaderLayoutService } from '../compliace_management_header.service';

@Component({
  selector: 'ryzen-compliance-review',
  templateUrl: './compliance-review.component.html',
  styleUrls: ['./compliance-review.component.scss']
})
export class ComplianceReviewComponent implements OnInit, AfterViewInit{
 /**
   * Constructor
   *
   * @param {FuseSidebarService} _fuseSidebarService
   */

  sidebar_header_height = new BehaviorSubject<number>(0);
  sidebar_header_height$ = this.sidebar_header_height.asObservable();
  @ViewChild('sidebar_header') sidebar_header: ElementRef;
  
  status = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];
  constructor( private _fuseSidebarService: FuseSidebarService, public _headerService: HeaderService,
    public _complaiceHeaderLayoutService : ComplianceManagementHeaderLayoutService) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this.setSidebarHeaderHeight();
    });
  }

  private setSidebarHeaderHeight(): void {
    if (this.sidebar_header && this.sidebar_header !== null) {
      this.sidebar_header_height.next(
        this.sidebar_header.nativeElement.offsetHeight
      );
    }
  }

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}


