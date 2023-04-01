import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'exxat-checkbox-and-radio-button-example',
  templateUrl: './check-box-and-radio-button-example.component.html',
  styleUrls: ['./check-box-and-radio-button-example.component.scss'],
})
export class CheckboxAndRadioButtonExampleComponent {
  form: FormGroup;
  list = [
    { value: 'usc', viewValue: 'USC' },
    { value: 'losrios', viewValue: 'LosRios' },
    { value: 'exxat', viewValue: 'Exxat' },
    { value: 'common', viewValue: 'Common' },
  ];

  /**
   *
   */
  constructor(private _fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this._fb.group({
      checkBoxControl: [
        '',
        [
          (control) => {
            console.log(control);
            return !control.value ? { required: true } : null;
          },
        ],
      ],
      radioButtonControl: [
        '',
        [
          (control) => {
            return !control.value ? { required: true } : null;
          },
        ],
      ],
    });
  }

  getControlError(control: any) {
    if (this.form.touched) {
      const value =
        this.form.get(control).touched && this.form.get(control).invalid;
      return value;
    }
  }
}
