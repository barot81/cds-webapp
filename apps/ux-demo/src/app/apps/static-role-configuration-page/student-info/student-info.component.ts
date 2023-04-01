import { Component, OnInit } from '@angular/core';
import { GridService } from '../../student-grid/grid.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  feature: string;
  dataBucket: string;
  create: string;
  read: string;
  update: string;
  delete : string;
  noAccess:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { dataBucket: 'Data Bucket 1', feature: 'Student banner, Update student picture', create: '', read: 'H', update: '' , delete:'', noAccess:''  },
  { dataBucket: 'Data Bucket 2', feature: 'Academic Information (Except academic standing), Program requirements, Manage program requirements report, Associated staff and faculty', create: '4.0026', read: 'He' , update: '' , delete:'', noAccess:'' },
  { dataBucket: 'Data Bucket 3', feature: 'Academic info (with Academic standing field under status section) + Advisory section: Academic improvement plan-advisor notes-forms/documents + Student grades + Student summary/progress report ', create: '6.941', read: 'Li' , update: '' , delete:'', noAccess:'' },
  { dataBucket: 'Data Bucket 4', feature: 'Student search + Student info/profile (except the Demographic information section ) +contact + Student address report + Student emergency contact report + Language proficiency report + Profile attestation status report + Graphical report for race, gender, age, ethnicity  + Professional interest report + Student info report  (excluding the fields/ columns that are part of the demographic information section which includes information about their race, gender, ethnicity, etc)', create: '9.0122', read: 'Be', update: '' , delete:'', noAccess:''  },
  { dataBucket: 'Data Bucket 5', feature: 'Student tags + Ability to filter for tags', create: '10.811', read: 'B', update: '' , delete:'', noAccess:''  },
  { dataBucket: 'Data Bucket 6', feature: 'Student compliance + Share profile +  include compliance bit while sharing the student profile', create: '12.0107', read: 'C' , update: '' , delete:'', noAccess:'' },
  { dataBucket: 'Data Bucket 7', feature: 'Student banner, Update student picture', create: '1.0079', read: 'H', update: '' , delete:'', noAccess:'' },
  { dataBucket: 'Data Bucket 8', feature: 'Academic Information (Except academic standing), Program requirements, Manage program requirements report, Associated staff and faculty', create: '4.0026', read: 'He', update: '' , delete:'', noAccess:''  },
  { dataBucket: 'Data Bucket 9', feature: 'Academic info (with Academic standing field under status section) + Advisory section: Academic improvement plan-advisor notes-forms/documents + Student grades + Student summary/progress report ', create: '6.941', read: 'Li' , update: '' , delete:'', noAccess:'' },
  { dataBucket: 'Data Bucket 10', feature: 'Intervention + Student intervention report', create: '9.0122', read: 'Be', update: '' , delete:'', noAccess:''  },
  { dataBucket: 'Data Bucket 11', feature: 'Student tags + Ability to filter for tags', create: '10.811', read: 'B', update: '' , delete:'', noAccess:''  },
  { dataBucket: 'Data Bucket 12', feature: 'Student compliance + Share profile +  include compliance bit while sharing the student profile', create: '12.0107', read: 'C' , update: '' , delete:'', noAccess:'' },
  
];

@Component({
  selector: 'ryzen-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  displayedColumns: string[] = ['dataBucket', 'feature', 'create', 'read' , 'update' , 'delete' , 'noAccess'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(public gridService: GridService) { }

  ngOnInit() {
  }

}
