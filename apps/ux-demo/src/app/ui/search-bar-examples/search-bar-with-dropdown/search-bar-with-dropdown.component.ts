import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  address: string;
  email: string;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Albert Ortega',
    address: '16 Military Ave., Cary, NC 27511',
    email: 'albertortega@example.com',
    phone: '(435) 682-9206',
  },
];
@Component({
  selector: 'ryzen-search-bar-with-dropdown',
  templateUrl: './search-bar-with-dropdown.component.html',
  styleUrls: ['./search-bar-with-dropdown.component.scss'],
})
export class SearchBarWithDropdownComponent implements OnInit {
  searchItem = new FormControl();

  SearchFields = [
    { displayName: 'Student Name', fieldName: 'Student Name' },
    { displayName: 'Email', fieldName: 'Email' },
    { displayName: 'Phone', fieldName: 'Phone' },
    { displayName: 'Practice Setting', fieldName: 'Practice Setting' },
    { displayName: 'Time', fieldName: 'Time' },
  ];

  displayedColumns: string[] = ['name', 'address', 'email', 'phone'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() {}

  ngOnInit() {}

  onClearClick(event: any) {
    alert(event);
  }

  searchedValues($event) {
    console.log($event);
  }
}
