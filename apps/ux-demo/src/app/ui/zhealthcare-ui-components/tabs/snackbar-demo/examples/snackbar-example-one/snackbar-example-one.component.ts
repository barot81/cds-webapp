import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'ryzen-snackbar-example-one',
  templateUrl: './snackbar-example-one.component.html',
})
export class SnackbarExampleOneComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSnackBar() {
    let snackBarRef = this._snackBar.open('Snackbar With Action', 'Action', {
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Action Called !!');
    });
  }
}
