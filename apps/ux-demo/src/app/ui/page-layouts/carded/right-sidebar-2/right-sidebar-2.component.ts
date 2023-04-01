import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';
import { Template6DialogBoxComponent } from './template6-dialog-box/template6-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector   : 'carded-right-sidebar-2',
    templateUrl: './right-sidebar-2.component.html',
    styleUrls  : ['./right-sidebar-2.component.scss']
})
export class CardedRightSidebar2Component
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
        const dialogRef = this.dialog.open(Template6DialogBoxComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
