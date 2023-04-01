import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '@exxat/ux';
import { filter } from 'rxjs/operators';
import { LayoutPopupOneComponent } from '../../common/popups/layout-popup-one/layout-popup-one.component';

@Component({
  selector: 'fullwidth-component-scroll',
  templateUrl: './fullwidth-component-scroll.component.html',
})
export class FullWidthComponentScrollComponent {

  constructor(
    public dialog: MatDialog
  ) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(LayoutPopupOneComponent);
  }
}
