import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ITime, CLOCK_TYPE } from '../exxat-clock/exxat-clock.component';
import { ExxatTimeUtils } from '../exxatTimeUtils';

@Component({
  selector: 'exxat-time',
  templateUrl: './exxat-time.component.html',
  styleUrls: ['./exxat-time.component.scss']
})
export class ExxatTimeComponent implements OnInit {

  @Input() userTime: ITime;
  @Output() userTimeChange: EventEmitter<ITime> = new EventEmitter();

  @Input() revertLabel: string;
  @Input() submitLabel: string;

  @Output() onRevert: EventEmitter<null> = new EventEmitter();
  @Output() onSubmit: EventEmitter<ITime> = new EventEmitter();

  @Input() color: string;

  public VIEW_HOURS = CLOCK_TYPE.HOURS;
  public VIEW_MINUTES = CLOCK_TYPE.MINUTES;
  public currentView: CLOCK_TYPE = this.VIEW_HOURS;

  constructor() {}

  ngOnInit() {
    if (!this.userTime) {
      this.userTime = {
        hour: 6,
        minute: 0,
        meriden: 'PM',
        format: 12
      };
    }

    if (!this.revertLabel) {
      this.revertLabel = 'Cancel';
    }

    if (!this.submitLabel) {
      this.submitLabel = 'Okay';
    }
  }

  public formatHour(format, hour): string {
    return ExxatTimeUtils.formatHour(format, hour);
  }

  public formatMinute(minute): string {
    return ExxatTimeUtils.formatMinute(minute);
  }

  public setCurrentView(type: CLOCK_TYPE) {
    this.currentView = type;
  }

  public setMeridien(m: 'PM' | 'AM') {
    this.userTime.meriden = m;
  }

  public revert() {
    this.onRevert.emit();
  }

  public submit() {
    this.onSubmit.emit(this.userTime);
  }

  public emituserTimeChange(event) {
    this.userTimeChange.emit(this.userTime);
  }
}
