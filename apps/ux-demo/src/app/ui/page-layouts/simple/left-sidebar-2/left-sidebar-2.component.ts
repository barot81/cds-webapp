import { Component } from '@angular/core';

import { FuseSidebarService } from '@zhealthcare/ux';
import { MatDialog } from '@angular/material/dialog';
import { ComposeComponent } from '../compose/compose.component';
import { LeftSidebarSeparateScrollComponent } from './left-sidebar-separate-scroll/left-sidebar-separate-scroll.component';

@Component({
    selector   : 'simple-left-sidebar-2',
    templateUrl: './left-sidebar-2.component.html',
})
export class SimpleLeftSidebar2Component
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

    openDialog() {
        const dialogRef = this.dialog.open(LeftSidebarSeparateScrollComponent);
    
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
