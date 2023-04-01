import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, HeaderService, ScrollService } from '@exxat/ux';
import { filter } from 'rxjs/operators';
import { LayoutPopupFourComponent } from '../../common/popups/layout-popup-four/layout-popup-four.component';
import { LayoutPopupTwoComponent } from '../../common/popups/layout-popup-two/layout-popup-two.component';

@Component({
    selector   : 'two-column-with-header',
    templateUrl: './two-column-with-header.component.html',
})
export class TwoColumnWithHeaderComponent
{

    @ViewChild('sidebarHeader') sidebarHeader: ElementRef;
    @ViewChild('mainHeader') mainHeader: ElementRef;

    private currentURL =
    '/admin/ux/ui/page-layouts/layouts/two-column-with-header';

    constructor(public dialog: MatDialog, public _headerService: HeaderService, 
        private _router: Router,public readonly _scrollService: ScrollService, public _fuseSidebarService: FuseSidebarService)
    {
        this._router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(async (event$) => {
          if (this.currentURL === event$['url']) {
            await this.setHeadersHeight();
          }
        });
    }
    
      private async setHeadersHeight() {
        setTimeout(async () => {
          if (this.sidebarHeader && this.sidebarHeader !== null) {
               // Reset Main Header Height
            await this._scrollService.resetSidebarHeaderHeight();
            // Set New Height to The Main Header
            await this._scrollService.setSidebarHeaderHeight(
              this.sidebarHeader.nativeElement.offsetHeight
            );
        }
          if (this.mainHeader && this.mainHeader !== null) {
            // Reset Main Header Height
            await this._scrollService.resetMainHeaderHeight();
            // Set New Height to The Main Header
            await this._scrollService.setMainHeaderHeight(
              this.mainHeader.nativeElement.offsetHeight
            );
          }
        });
      }

    openDialog() {
        const dialogRef = this.dialog.open(LayoutPopupFourComponent);
      }

      toggleSidebar(name): void
      {
          this._fuseSidebarService.getSidebar(name).toggleOpen();
      }
}
