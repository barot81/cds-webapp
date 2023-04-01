import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'ryzen-snackbar-without-action',
  templateUrl: './snackbar-without-action.component.html',
})
export class SnackbarWithoutActionComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSnackBar() {
    this._snackBar.open('Success Snackbar With Text Center ', '', {
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-success', 'snackbar-text-center'],
    });
  }
}
