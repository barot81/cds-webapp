import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '@exxat/ux';
import { checkboxPopupExampleDemoComponent } from './checkbox-popup-example-demo/checkbox-popup-example-demo.component';
import { dialogBoxWithHeadingDemoComponent } from './dialog-box-with-heading-demo/dialog-box-with-heading-demo.component';
import { DialogBoxWithImageDemoComponent } from './dialog-box-with-image-demo/dialog-box-with-image-demo.component';
import { PopupExampleDemoComponent } from './popup-example-demo/popup-example-demo.component';

@Component({
  selector: 'ryzen-confirm-dialog-box-demo',
  templateUrl: './confirm-dialog-box-demo.component.html',
  styleUrls: ['./confirm-dialog-box-demo.component.scss']
})
export class ConfirmDialogBoxDemoComponent implements OnInit {

  public message: string;

  constructor(private _ConfirmDialogService: ConfirmDialogService ,  public dialog: MatDialog) {
    this.message = 'Are you sure you want to delete this entity ?';
  }

  ngOnInit() {
  }

  openDialogWithInputCheck() {
    this._ConfirmDialogService.open(this.message, { ok: 'Delete', cancel: 'Cancel', inputCheck: true });
    this._ConfirmDialogService.confirmDialogAction().subscribe(confirmed => {
      if (confirmed) {
      // Perform any action on success closer of dialog
      }
    });
  }

  openDialogWithoutInputCheck() {
    this._ConfirmDialogService.open(this.message, { ok: 'Delete', cancel: 'Cancel' });
    this._ConfirmDialogService.confirmDialogAction().subscribe(confirmed => {
      if (confirmed) {
        // Perform any action on success closer of dialog
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupExampleDemoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogWithCheckbox() {
    const dialogRef = this.dialog.open(checkboxPopupExampleDemoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogWithImage() {
    const dialogRef = this.dialog.open(DialogBoxWithImageDemoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogWithHeading() {
    const dialogRef = this.dialog.open(dialogBoxWithHeadingDemoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

  

}
