import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';
import { MatDialog } from '@angular/material/dialog';
import { LayoutPopComponent } from './layout-popup/layout-popup.component';

@Component({
    selector   : 'carded-left-sidebar-1',
    templateUrl: './left-sidebar-1.component.html',
    styleUrls  : ['./left-sidebar-1.component.scss']
})
export class CardedLeftSidebar1Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,  public dialog: MatDialog
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    
    openDialog() {
        const dialogRef = this.dialog.open(LayoutPopComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
