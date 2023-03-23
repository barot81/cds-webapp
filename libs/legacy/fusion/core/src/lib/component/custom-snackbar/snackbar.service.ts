import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FusionCustomSnackbarComponent } from './custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class FusionSnackbarService {
  constructor(public snackBar: MatSnackBar) {}

  openCustomSnackBar(
    data: any,
    duration?: number,
    panelClass?: string,
    verticalPosition?: MatSnackBarVerticalPosition
  ) {
    this.snackBar.openFromComponent(FusionCustomSnackbarComponent, {
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
