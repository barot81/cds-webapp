import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { zhealthcareDrawerFormService } from '../../zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-zhealthcare-two-column-drawer',
  templateUrl: './zhealthcare-two-column-drawer.component.html',
  styleUrls: ['./zhealthcare-two-column-drawer.component.scss']
})
export class zhealthcareTwoColumnDrawerComponent implements OnInit {
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

  constructor(public zhealthcareDrawerFormService: zhealthcareDrawerFormService, private _formBuilder: FormBuilder) {
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
