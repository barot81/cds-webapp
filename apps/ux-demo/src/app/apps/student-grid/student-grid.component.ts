import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GridService } from './grid.service';
import { DataSourceFacade, ColumnOption } from '@exxat/plugin/data-source';

export interface FiltertedList {
  name: string;
  color: string;
}

export interface SearchField {
  value: string;
  id: number;
}

export interface PeriodicElement {
  src: string,
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  setting: string;
  time: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "assets/images/avatars/alice.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "assets/images/avatars/Barrera.jpg", firstName: 'Winkfield', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "assets/images/avatars/Blair.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "assets/images/avatars/Boyle.jpg", firstName: '', lastName: '', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  //{ src: "assets/images/avatars/Christy.jpg", firstName: 'Anna', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "", firstName: 'Anna', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },

  { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', email: 'Nipetribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  //{ src: "assets/images/avatars/Barrera.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },

  { src: "assets/images/avatars/Boyle.jpg", firstName: 'PWelson', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
  { src: "assets/images/avatars/Christy.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
];

@Component({
  selector: 'ryzen-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss']
})

export class StudentGridComponent implements OnInit {

  selectedValue: string;

  SearchFields: SearchField[] = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];

  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'setting', 'time', 'action'];
  
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  cohort = new FormControl();
  
  tag = new FormControl();
  
  cohortList: string[] = ['Class 2020', 'Class 2021', 'Class 2022', 'Class 2023', 'Class 2024'];
  
  tagList: string[] = ['Needs Attention', 'In Program', 'Out of program'];
  
  searchText: string;
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  columnInformation = [
    {
      displayName: 'select',
      fieldName: 'select',
      isSearchable:false,
      isDisplayColumn:false
    },
    {
      displayName: 'name',
      fieldName: 'name',
      isSearchable:false,
      isDisplayColumn:true
    },
    {
      displayName: 'email',
      fieldName: 'email',
      isSearchable:false,
      isDisplayColumn:true
    },
    {
      displayName: 'phone',
      fieldName: 'phone',
      isSearchable:false,
      isDisplayColumn:true
    },
    {
      displayName: 'setting',
      fieldName: 'setting',
      isSearchable:true,
      isDisplayColumn:true
    },
    {
      displayName: 'time',
      fieldName: 'time',
      isSearchable:false,
      isDisplayColumn:true
    },
    {
      displayName: 'action',
      fieldName: 'action',
      isSearchable:false,
      isDisplayColumn:true
    }
  ];

  Cohorts: FiltertedList[] = [
    { name: 'Class 2020', color: 'warn' },
    { name: 'Class 2021', color: 'warn' },
    { name: 'Class 2022', color: 'warn' },
  ];

  Tags: FiltertedList[] = [
    { name: 'Needs Attention', color: 'accent' }
  ];
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  constructor(public gridService: GridService,private datasourceFacade: DataSourceFacade) { }

  ngOnInit() {
    
    this.datasourceFacade.LoadDataSource("http://10.10.2.27:5100/Profile/Load?$includes=Enrollment&$PageSize=30&$SortBy=firstName%20asc",this.columnInformation);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName + 1}`;
  }


}
