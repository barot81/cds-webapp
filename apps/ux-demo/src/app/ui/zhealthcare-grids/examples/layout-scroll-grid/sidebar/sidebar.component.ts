import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from '@zhealthcare/ux';
import { SidebarFocusHelper } from '../../../../zhealthcare-sidebar/zhealthcare-sidebar.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'zhealthcare-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @ViewChild('sidebarHeader') sidebarHeader: ElementRef;

  private currentURL = '/admin/ux/ui/zhealthcare-layout-scroll';

  private settlementHeight: number = 40;

  _unsubscribeAll = new Subject();

  selectedId: number = 1;

  students = [
    { id: 0, firstName: 'Anna', lastName: 'Strong' },
    { id: 1, firstName: 'Mindy', lastName: 'Strong' },
    { id: 2, firstName: 'Jeremy', lastName: 'Strong' },
    { id: 3, firstName: 'Dan', lastName: 'Strong' },
    { id: 4, firstName: 'Jim', lastName: 'Strong' },
    { id: 5, firstName: 'Michael', lastName: 'Strong' },
    { id: 6, firstName: 'Pam', lastName: 'Strong' },
    { id: 7, firstName: 'Kevin', lastName: 'Strong' },
    { id: 8, firstName: 'Dwight', lastName: 'Strong' },
    { id: 9, firstName: 'Angela', lastName: 'Strong' },
    { id: 10, firstName: 'Andy', lastName: 'Strong' },
  ];

  /**
   *
   */
  constructor(
    public readonly _scrollService: ScrollService,
    public _focus: SidebarFocusHelper,
    private _router: Router
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          await this.setSidebarHeaderHeight();
        }
      });
  }

  private async setSidebarHeaderHeight() {
    setTimeout(async () => {
      if (this.sidebarHeader && this.sidebarHeader !== null) {
        // Reset Sidebar Header Height
        await this._scrollService.resetSidebarHeaderHeight();

        // Set Sidebar Header Height
        await this._scrollService.setSidebarHeaderHeight(
          this.sidebarHeader.nativeElement.offsetHeight + this.settlementHeight
        );
      }
    });
  }

  activateNavigation(item: number) {
    this.selectedId = item;
    this._focus.shiftFocus();
  }
}
