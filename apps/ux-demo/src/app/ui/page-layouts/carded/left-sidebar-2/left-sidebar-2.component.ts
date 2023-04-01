import { Component } from '@angular/core';

import { FuseSidebarService } from '@zhealthcare/ux';
import { MatDialog } from '@angular/material/dialog';
import { LayoutPopupComponent } from './layout-popup/layout-popup.component';


@Component({
    selector   : 'carded-left-sidebar-2',
    templateUrl: './left-sidebar-2.component.html',
    styleUrls  : ['./left-sidebar-2.component.scss']
})
export class CardedLeftSidebar2Component
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
        const dialogRef = this.dialog.open(LayoutPopupComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    
}
