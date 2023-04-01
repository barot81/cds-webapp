import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-exxat-edit-columns-form-example',
  templateUrl: './exxat-edit-columns-form-example.component.html',
  styleUrls: ['./exxat-edit-columns-form-example.component.scss']
})
export class ExxatEditColumnsFormExampleComponent implements OnInit {

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
