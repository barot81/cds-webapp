import { Component, Inject } from '@angular/core';
import { ITime, CLOCK_TYPE } from '../zhealthcare-clock/zhealthcare-clock.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'zhealthcare-time-dialog',
  templateUrl: './zhealthcare-time-dialog.component.html',
  styleUrls: ['./zhealthcare-time-dialog.component.scss']
})
export class zhealthcareTimeDialogComponent {

  userTime: ITime;
  color: string;

  private VIEW_HOURS = CLOCK_TYPE.HOURS;
  private VIEW_MINUTES = CLOCK_TYPE.MINUTES;
  private currentView: CLOCK_TYPE = this.VIEW_HOURS;

  constructor(
    private dialogRef: MatDialogRef<zhealthcareTimeDialogComponent>,
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
