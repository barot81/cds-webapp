import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';
import { Template7DialogBoxComponent } from './template7-dialog-box/template7-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector   : 'carded-right-sidebar-tabbed-1',
    templateUrl: './right-sidebar-tabbed-1.component.html',
    styleUrls  : ['./right-sidebar-tabbed-1.component.scss']
})
export class CardedRightSidebarTabbed1Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService, public dialog: MatDialog
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
        const dialogRef = this.dialog.open(Template7DialogBoxComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
