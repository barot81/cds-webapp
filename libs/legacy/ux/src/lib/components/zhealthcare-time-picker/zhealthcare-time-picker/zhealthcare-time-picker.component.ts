import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITime } from '../zhealthcare-clock/zhealthcare-clock.component';
import { MatDialog } from '@angular/material/dialog';
import { zhealthcareTimeDialogComponent } from '../zhealthcare-time-dialog/zhealthcare-time-dialog.component';
import { zhealthcareTimeUtils } from '../zhealthcareTimeUtils';

@Component({
  selector: 'zhealthcare-time-picker',
  templateUrl: './zhealthcare-time-picker.component.html'
})
export class zhealthcareTimePickerComponent implements OnInit {

  @Input() label = 'Hour';
  @Input() appearance = 'legacy';
  @Input() userTime: ITime;
  @Input() color: string;
  @Input() revertLabel: string;
  @Input() submitLabel: string;

  @Output() change: EventEmitter<ITime> = new EventEmitter<ITime>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (!this.userTime) {
      this.userTime = {
        hour: 0,
        minute: 0,
        meriden: 'PM',
        format: 12
      };
    }
  }

  time(): string {
    if (!this.userTime) {
      return '';
    }

    let meriden = `${this.userTime.meriden}`;
    if (this.userTime.format === 24) {
      meriden = '';
    }

    let hour = `${this.userTime.hour}`;
    if (this.userTime.hour === 24) {
      hour = '00';
    }

    if (this.userTime.hour === 0 && this.userTime.minute === 0 && this.userTime.meriden === 'PM')
      return null;
    if (this.userTime.minute === 0) {
      return `${hour}:00 ${meriden}`;
    } else if (this.userTime.minute < 10) {
      const tt = '0' + String(this.userTime.minute);
      return `${hour}:${tt} ${meriden}`;
    } else {
      return `${hour}:${this.userTime.minute} ${meriden}`;
    }
  }

  showPicker() {
    const dialogRef = this.dialog.open(zhealthcareTimeDialogComponent, {
      data: {
        time: {
          hour: this.userTime.hour,
          minute: this.userTime.minute,
          meriden: this.userTime.meriden,
          format: this.userTime.format
        },
        color: this.color,
        revertLabel: this.revertLabel,
        submitLabel: this.submitLabel
      }
    });

    dialogRef.afterClosed().subscribe((result: ITime | -1) => {
      // result will be update userTime object or -1 or undefined (closed dialog w/o clicking cancel)
      if (result === undefined) {
        return;
      } else if (result !== -1) {
        this.userTime = result;

        const hour = result.hour;
        const minute = result.minute;

        const dataEvent = {
          hour: zhealthcareTimeUtils.formatHour(result.format, hour),
          minute: zhealthcareTimeUtils.formatMinute(minute),
          meriden: this.userTime.meriden,
          format: this.userTime.format
        };
        this.emitChange(dataEvent);
      }
    });
    return false;
  }

  private emitChange(data) {
    this.change.emit(data);
  }
}
