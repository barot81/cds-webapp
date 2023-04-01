import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-add-course-measures',
  templateUrl: './add-course-measures.component.html',
})
export class AddCourseMeasuresComponent implements OnInit {
  options: FormGroup;
  termControl = new FormControl('Setting 123');
  constructor() { }

  ngOnInit() {
  }

}
