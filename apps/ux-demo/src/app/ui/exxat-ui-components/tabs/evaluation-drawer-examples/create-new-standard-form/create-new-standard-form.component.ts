import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-new-standard-form',
  templateUrl: './create-new-standard-form.component.html',
})
export class createNewStandardFormComponent implements OnInit {
  demoList = [
    { value: 'demo1', viewValue: 'Demo 1' },
    { value: 'demo2', viewValue: 'Demo 2' },
  ];

  anchorList = [
    { value: 'demo1', viewValue: 'Demo 1' },
    { value: 'demo2', viewValue: 'Demo 2' },
  ];
  constructor() {}

  ngOnInit() {}
}
