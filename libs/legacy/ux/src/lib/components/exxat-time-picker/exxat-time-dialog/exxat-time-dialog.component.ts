import { Component, Inject } from '@angular/core';
import { ITime, CLOCK_TYPE } from '../exxat-clock/exxat-clock.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'exxat-time-dialog',
  templateUrl: './exxat-time-dialog.component.html',
  styleUrls: ['./exxat-time-dialog.component.scss']
})
export class ExxatTimeDialogComponent {

  userTime: ITime;
  color: string;

  private VIEW_HOURS = CLOCK_TYPE.HOURS;
  private VIEW_MINUTES = CLOCK_TYPE.MINUTES;
  private currentView: CLOCK_TYPE = this.VIEW_HOURS;

  constructor(
    private dialogRef: MatDialogRef<ExxatTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userTime = this.data.time;
    this.color = this.data.color;
  }

  public revert() {
    this.dialogRef.close(-1);
  }

  public submit() {
    this.dialogRef.close(this.userTime);
  }
}
