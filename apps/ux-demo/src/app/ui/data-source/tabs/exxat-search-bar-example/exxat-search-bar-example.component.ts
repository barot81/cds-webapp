import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-exxat-search-bar-example',
  templateUrl: './exxat-search-bar-example.component.html',
  styleUrls: ['./exxat-search-bar-example.component.scss']
})
export class ExxatSearchBarExampleComponent implements OnInit {

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
