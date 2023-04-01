import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ryzen-drawer-columns',
  templateUrl: './drawer-columns.component.html',
})
export class DrawerColumnsComponent implements OnInit {

  form: FormGroup;
  data: any;
  key: string;
  checked = false;
  indeterminate = false;

  primaryAction() {
    throw new Error("Method not implemented.");
  }
  secondaryAction() {
    throw new Error("Method not implemented.");
  }

  checkboxList = [
    { value: "male", viewValue: "Male" },
    { value: "female", viewValue: "Female" }
  ];

  constructor(private _formBuilder: FormBuilder) {
    // Reactive Form
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      checkbox: ['', Validators.required],
      gender: ['', Validators.required],
      ssn: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

}
