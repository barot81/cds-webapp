import { Component } from '@angular/core';

import { FuseSidebarService } from '@zhealthcare/ux';
import { Template3DialogBoxComponent } from './template3-dialog-box/template3-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector   : 'carded-left-sidebar-tabbed-1',
    templateUrl: './left-sidebar-tabbed-1.component.html',
    styleUrls  : ['./left-sidebar-tabbed-1.component.scss']
})
export class CardedLeftSidebarTabbed1Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        public dialog: MatDialog
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
        const dialogRef = this.dialog.open(Template3DialogBoxComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
