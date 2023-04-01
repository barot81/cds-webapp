import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';
import { MatDialog } from '@angular/material/dialog';
import { LeftSidebarSingleScrollComponent } from './left-sidebar-single-scroll/left-sidebar-single-scroll.component';

@Component({
    selector   : 'simple-left-sidebar-1',
    templateUrl: './left-sidebar-1.component.html',
})
export class SimpleLeftSidebar1Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService , public dialog: MatDialog,
    )
    {
    }

    openDialog() {
        const dialogRef = this.dialog.open(LeftSidebarSingleScrollComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
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
}
