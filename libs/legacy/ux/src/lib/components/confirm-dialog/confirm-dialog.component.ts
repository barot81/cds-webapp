import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogService } from './confirm-dialog.service';
import { FormControl } from '@angular/forms';

export class ConfirmDialogModel {
  constructor(
    public confirmMessage: string,
    public confirmActions: any
  ) { }
}

@Component({
  selector: 'fuse-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class FuseConfirmDialogComponent {
  confirmMessage: string;
  confirmActions: any;
  randomNumber = 0;
  error = false;
  output = new FormControl();
  inputCheckFormField: boolean;

  constructor(
    public dialogRef: MatDialogRef<FuseConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    private _confirmDialogService: ConfirmDialogService
  ) {
    this.confirmMessage = data.confirmMessage;
    this.confirmActions = data.confirmActions;

    if (!this.confirmActions.inputCheck) {
      this.inputCheckFormField = true;
    }
    this.randomNumber = Math.floor(Math.random() * 99 + 1);

  }

  onConfirm(confirmation: boolean) {
    if (confirmation) {
      if (this.inputCheckFormField) {
        this.closeAndSend(confirmation);
      } else {
        this.checkInputOutput(confirmation);
      }
    } else {
      this.closeAndSend(confirmation);
    }
  }

  checkInputOutput(confirmation: boolean) {
    if (
      !isNaN(this.randomNumber) &&
      this.randomNumber === Number(this.output.value)
    ) {
      this.closeAndSend(confirmation);
    } else {
      this.error = true;
    }
  }

  closeAndSend(confirmation: boolean) {
    this.dialogRef.close(confirmation);
    this._confirmDialogService.confirmDialogAction();
  }

}
