/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicOverlayService } from '@exxat/ux';

@Component({
  selector: 'overlay-form',
  templateUrl: './overlay-form.component.html',
})
export class OverlayFormComponent {
  frmSubscribe: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _overlayService: DynamicOverlayService
  ) {
    this.frmSubscribe = this.fb.group({
      name: this._overlayService.inputData.name,
      email: [
        this._overlayService.inputData.email,
        Validators.compose([Validators.email, Validators.required]),
      ],
    });
  }

  cancel(type: 'save' | 'cancel') {
    if (type === 'save') {
      this._overlayService.close(this.frmSubscribe.value);
    } else {
      this._overlayService.close(null);
    }
  }
}
