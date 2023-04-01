import { Component, OnInit } from '@angular/core';
import { ExxatDrawerFormService } from '../../exxat-drawer-forms-shared.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ryzen-exxat-drawer-form-examples',
  templateUrl: './exxat-drawer-form-examples.component.html',
  styleUrls: ['./exxat-drawer-form-examples.component.scss']
})
export class ExxatDrawerFormExamplesComponent implements OnInit {

  form: FormGroup;
  data: any;
  key: string;
  checked = false;
  indeterminate = false;

  radioButtonList = [
    { value: "usc", viewValue: "USC" },
    { value: "losrios", viewValue: "LosRios" }
  ]
  checkboxList = [
    { value: "usc", viewValue: "USC" },
    { value: "losrios", viewValue: "LosRios" }
  ];

  genderList = [
    { value: "male", viewValue: "Male" },
    { value: "female", viewValue: "Female" },
    { value: "others", viewValue: "Others" }
  ];

  ethnicityList = [
    { value: "hispanic", viewValue: "Hispanic" },
    { value: "non-hispanic", viewValue: "Non-Hispanic" }
  ];

  raceList = [
    { value: "hispanic", viewValue: "Hispanic" },
    { value: "non-hispanic", viewValue: "Non-Hispanic" }
  ];

  constructor(public exxatDrawerFormService: ExxatDrawerFormService, private _formBuilder: FormBuilder) {
    // Reactive Form
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maidenName: ['', Validators.required],
      checkbox: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      race: ['', Validators.required],
      ethnicity: ['', Validators.required],
      schoolmail: ['', Validators.required],
      studentId: ['', Validators.required],
      ssn: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      homePhone: ['', Validators.required],
      cellPhone: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      country: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

}
