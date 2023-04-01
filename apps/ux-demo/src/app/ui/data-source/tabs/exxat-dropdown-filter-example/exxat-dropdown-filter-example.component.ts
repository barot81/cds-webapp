import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-exxat-dropdown-filter-example',
  templateUrl: './exxat-dropdown-filter-example.component.html',
  styleUrls: ['./exxat-dropdown-filter-example.component.scss']
})
export class ExxatDropdownFilterExampleComponent implements OnInit {

  rotationList = [
    { viewName: 'Rotation 1', value: 'rotation1' },
    { viewName: 'Rotation 2', value: 'rotation2' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
