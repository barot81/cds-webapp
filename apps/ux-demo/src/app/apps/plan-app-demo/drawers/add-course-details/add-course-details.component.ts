import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface listItem {
  id: string,
  value: string
}

@Component({
  selector: 'ryzen-add-course-details',
  templateUrl: './add-course-details.component.html',
})
export class AddCourseDetailsComponent implements OnInit {


  types: listItem[] = [
    { id: 'Professional', value: 'Professional' },
    { id: 'Professional', value: 'Professional' },
    { id: 'Professional', value: 'Professional' },
    { id: 'Professional', value: 'Professional' }
  ];

  courses: listItem[] = [
    { id: 'PT', value: 'PT' },
    { id: 'OT', value: 'OT' },
    { id: 'PT', value: 'PT' },
    { id: 'PA', value: 'PA' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
