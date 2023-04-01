import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ryzen-perform-placement',
  templateUrl: './perform-placement.component.html',
  styleUrls: ['./perform-placement.component.scss']
})
export class PerformPlacementComponent implements OnInit {

  performForm: FormGroup;

  courseList = [{ viewName: 'Orlado', value: 'orlado' },
  { viewName: 'Brazil', value: 'brazil' }];

  programList = [{ viewName: 'Orlado', value: 'orlado' },
  { viewName: 'Brazil', value: 'brazil' }];

  constructor(private fb: FormBuilder) {
    this.performForm = this.fb.group({
      course: [this.courseList[0].value],
      program: [this.programList[0].value],
      placementDate:[]
    })
  }

  ngOnInit() {
  }

}
