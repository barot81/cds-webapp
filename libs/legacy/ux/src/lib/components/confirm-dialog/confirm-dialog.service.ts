import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import {
  ConfirmDialogModel,
  FuseConfirmDialogComponent,
} from './confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  dialogRef;
  constructor(private dialog: MatDialog) {}

  open(confirmMessage: string, confirmActions: any, width: string = '500px') {
    this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      width: width,
      data: new ConfirmDialogModel(confirmMessage, confirmActions),
      disableClose: true,
    });
  }

  confirmDialogAction() {
    if (this.dialog) {
      return this.dialogRef?.afterClosed().pipe(
        take(1),
        map((res) => {
          return res;
        })
      );
    }
  }

  primaryAction() {}
  secondaryAction() {}
}
