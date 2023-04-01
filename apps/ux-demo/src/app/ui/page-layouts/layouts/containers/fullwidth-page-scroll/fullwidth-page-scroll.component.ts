import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from '@zhealthcare/ux';
import { LayoutPopupTwoComponent } from '../../common/popups/layout-popup-two/layout-popup-two.component';

@Component({
    selector   : 'fullwidth-page-scroll',
    templateUrl: './fullwidth-page-scroll.component.html',
})
export class FullWidthPageScrollComponent
{
    /**
     * Constructor
     */
    constructor(public dialog: MatDialog, public _headerService: HeaderService)
    {
    }

    openDialog() {
        const dialogRef = this.dialog.open(LayoutPopupTwoComponent);
      }
}
