
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../student-grid/grid.service';


export interface PeriodicElement {
  name: string;
  email: string;
  phone: string;
  address:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
  { name: 'Theresa Webb', email: 'annastrong@example.com', phone: '(406) 555-0120' ,address: 'Ability rehab, Riverside county, Corporate ' , },
 
];


@Component({
  selector: 'ryzen-associate-clinical-instructor-drawer',
  templateUrl: './associate-clinical-instructor-drawer.component.html',
})
export class AssociateClinicalInstructorDrawerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone','address'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(public gridService: GridService) { }

  designationList = [
    { value: "Designation 1", viewValue: "Designation 1" },
    { value: "Designation 2", viewValue: "Designation 2" },
    { value: "Designation 3", viewValue: "Designation 3" }
  ];

  ngOnInit() {
  }

}


