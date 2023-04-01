import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-zhealthcare-edit-columns-form-example',
  templateUrl: './zhealthcare-edit-columns-form-example.component.html',
  styleUrls: ['./zhealthcare-edit-columns-form-example.component.scss']
})
export class zhealthcareEditColumnsFormExampleComponent implements OnInit {

  columnsList = [
    'Student Name',
    'Email',
    'Phone',
    'Practice Setting',
    'Time'
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
