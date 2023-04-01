import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'zhealthcare-accordian-variations',
  templateUrl: './zhealthcare-accordian-variations.component.html',
  styleUrls: ['./zhealthcare-accordian-variations.component.scss']
})
export class zhealthcareAccordianVariationsComponent implements OnInit {
  form: FormGroup;

  constructor(public _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      locationName: [''],
      rotationName: [''],
      settingName: [''],
      contactWith: ['']
    });
  }

  ngOnInit() {}

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.scrollHeight > 40; // 40 is the value of height of the 2 line text
    } else {
      return false;
    }
  }
}
