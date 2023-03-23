import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl:'control-error.component.html',
  styleUrls: ['./control-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent implements OnInit {
  _errors;
  _hide = true;
  _errorMessages;
  @Input() set errors(value) {
    if (value !== this._errors) {
      this._errors = value;
    }
  }
  @Input() set errorMessages(value) {
    if (value !== this._errorMessages) {
      this._errorMessages = value;
      this.cdr.detectChanges();
    }
  }

  constructor(private readonly cdr: ChangeDetectorRef) {
   }

  ngOnInit() {
  }

}
