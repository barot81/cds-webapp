import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, HeaderService, ScrollService } from '@zhealthcare/ux';
import { filter } from 'rxjs/operators';
import { LayoutPopupThreeComponent } from '../../common/popups/layout-popup-three/layout-popup-three.component';


@Component({
    selector   : 'two-column',
    templateUrl: './two-column.component.html',
})
export class TwoColumnComponent
{
   
    constructor(public dialog: MatDialog, public _headerService: HeaderService,  public _fuseSidebarService: FuseSidebarService)
    {
      
    }
   
    openDialog() {
        const dialogRef = this.dialog.open(LayoutPopupThreeComponent);
      }

      toggleSidebar(name): void
      {
          this._fuseSidebarService.getSidebar(name).toggleOpen();
      }
}
