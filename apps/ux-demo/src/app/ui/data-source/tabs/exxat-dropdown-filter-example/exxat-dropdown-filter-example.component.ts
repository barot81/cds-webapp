import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-zhealthcare-dropdown-filter-example',
  templateUrl: './zhealthcare-dropdown-filter-example.component.html',
  styleUrls: ['./zhealthcare-dropdown-filter-example.component.scss']
})
export class zhealthcareDropdownFilterExampleComponent implements OnInit {

  rotationList = [
    { viewName: 'Rotation 1', value: 'rotation1' },
    { viewName: 'Rotation 2', value: 'rotation2' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
