import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseSidebarService, HeaderService } from '@exxat/ux';
import { LayoutPopupFiveComponent } from '../../common/popups/layout-popup-five/layout-popup-five.component';

@Component({
    selector   : 'three-column-with-header',
    templateUrl: './three-column-with-header.component.html',
})
export class ThreeColumnWithHeaderComponent{

    constructor(public dialog: MatDialog, public _headerService: HeaderService, public _fuseSidebarService: FuseSidebarService)
    {
    }

    openDialog() {
        const dialogRef = this.dialog.open(LayoutPopupFiveComponent);
      }

      toggleSidebar(name): void
      {
          this._fuseSidebarService.getSidebar(name).toggleOpen();
      }
}
