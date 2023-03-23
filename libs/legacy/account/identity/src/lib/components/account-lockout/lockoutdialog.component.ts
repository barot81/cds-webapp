import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LockoutDialog } from './lockoutDialog.model';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lockout-dialog',
  templateUrl:'lockoutdialog.component.html',
  styleUrls:['lockoutdialog.component.scss']
})
export class LockOutDialogComponent {
  lockoutEnd:Date;

  constructor(
    public dialogRef: MatDialogRef<LockOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LockoutDialog) {
      this.lockoutEnd = new Date(data.lockoutEnd);
    }

  onClose(): void {
    this.dialogRef.close();
  }

}
