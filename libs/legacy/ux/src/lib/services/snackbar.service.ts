import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { SnackBarWithCloseComponent } from '../components/exxat-snack-bar/components';
import { CustomSnackbarComponent } from '../components/exxat-snack-bar/components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'any',
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  openSnackBar(
    message: string,
    action?: string,
    duration?: number,
    verticalPosition?: MatSnackBarVerticalPosition,
    horizontalPosition?: MatSnackBarHorizontalPosition,
    panelClass?: string
  ) {
    this.zone.run(() => {
      this.snackBar.open(message, !!action ? action : '', {
        duration: !!duration ? duration : 3000,
        panelClass: !!panelClass ? [panelClass] : ['snackbar-default'],
        verticalPosition: !!verticalPosition ? verticalPosition : 'top',
        horizontalPosition: !!horizontalPosition
          ? horizontalPosition
          : 'center',
      });
    });
  }

  openSnackBarWithClose(
    message: string,
    duration: number = 0,
    panelClass?: string,
    verticalPosition?: MatSnackBarVerticalPosition
  ) {
    const config: MatSnackBarConfig = {
      data: message,
      duration: duration,
      verticalPosition: !!verticalPosition ? verticalPosition : 'top',
      panelClass: !!panelClass ? [panelClass] : ['snackbar-default'],
    };
    this.snackBar.openFromComponent(SnackBarWithCloseComponent, config);
  }

  openCustomSnackBar(
    data: any,
    duration?: number,
    panelClass?: string,
    verticalPosition?: MatSnackBarVerticalPosition
  ) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: data?.message && data?.message !== null ? data?.message : data,
        icon: data?.icon && data?.icon !== null ? data?.icon : null,
      },
      duration: !!duration ? duration : 3000,
      panelClass: !!panelClass ? [panelClass] : ['snackbar-default'],
      verticalPosition: !!verticalPosition ? verticalPosition : 'top',
    });
  }
}
