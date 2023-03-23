import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITime } from '../exxat-clock/exxat-clock.component';
import { MatDialog } from '@angular/material/dialog';
import { ExxatTimeDialogComponent } from '../exxat-time-dialog/exxat-time-dialog.component';
import { ExxatTimeUtils } from '../exxatTimeUtils';

@Component({
  selector: 'exxat-time-picker',
  templateUrl: './exxat-time-picker.component.html'
})
export class ExxatTimePickerComponent implements OnInit {

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
    const dialogRef = this.dialog.open(ExxatTimeDialogComponent, {
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
          hour: ExxatTimeUtils.formatHour(result.format, hour),
          minute: ExxatTimeUtils.formatMinute(minute),
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
