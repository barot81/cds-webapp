/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-material-timepicker-content',
  templateUrl: './ngx-material-timepicker-content.component.html',
})
export class NgxMaterialTimepickerContentComponent {
  @Input() appendToInput: boolean;
  @Input() inputElement: any;
}
