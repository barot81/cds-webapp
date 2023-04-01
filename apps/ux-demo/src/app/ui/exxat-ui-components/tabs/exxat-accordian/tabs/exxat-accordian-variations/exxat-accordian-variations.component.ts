import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'exxat-accordian-variations',
  templateUrl: './exxat-accordian-variations.component.html',
  styleUrls: ['./exxat-accordian-variations.component.scss']
})
export class ExxatAccordianVariationsComponent implements OnInit {
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
