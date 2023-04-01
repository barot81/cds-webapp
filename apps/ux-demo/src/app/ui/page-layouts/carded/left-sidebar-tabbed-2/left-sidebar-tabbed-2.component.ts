import { Component } from '@angular/core';

import { FuseSidebarService } from '@zhealthcare/ux';
import { MatDialog } from '@angular/material/dialog';
import { Template4DialogBoxComponent } from './template4-dialog-box/template4-dialog-box.component';

@Component({
    selector   : 'carded-left-sidebar-tabbed-2',
    templateUrl: './left-sidebar-tabbed-2.component.html',
})
export class CardedLeftSidebarTabbed2Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService ,  public dialog: MatDialog
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
        const dialogRef = this.dialog.open(Template4DialogBoxComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
