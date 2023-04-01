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
    phone: '(435) 682-9206'
  }
];

@Component({
  selector: 'ryzen-simple-search-bar',
  templateUrl: './simple-search-bar.component.html',
  styleUrls: ['./simple-search-bar.component.scss'],
})
export class SimpleSearchBarComponent implements OnInit {
  searchItem = new FormControl();
  displayedColumns: string[] = [
    'name',
    'address',
    'email',
    'phone'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor() {}

  ngOnInit() {}
}
