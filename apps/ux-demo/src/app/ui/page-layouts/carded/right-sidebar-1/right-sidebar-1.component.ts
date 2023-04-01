import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';
import { Template5DialogBoxComponent } from './template5-dialog-box/template5-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector   : 'carded-right-sidebar-1',
    templateUrl: './right-sidebar-1.component.html',
    styleUrls  : ['./right-sidebar-1.component.scss']
})
export class CardedRightSidebar1Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,public dialog: MatDialog
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
        const dialogRef = this.dialog.open(Template5DialogBoxComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
