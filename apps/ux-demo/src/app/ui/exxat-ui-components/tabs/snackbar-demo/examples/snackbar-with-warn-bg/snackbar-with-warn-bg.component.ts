import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'ryzen-snackbar-with-warn-bg',
  templateUrl: './snackbar-with-warn-bg.component.html',
})
export class SnackbarWithWarnBgComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSnackBar() {
    this._snackBar.open('Unsuccess Snackbar With Text Center', '', {
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-unsuccess', 'snackbar-text-center'],
    });
  }
}
