import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  instances: string;
  status: string;
  submissionDate:string;
  score:number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { instances: 'NSG 1', status: '' ,submissionDate: '22nd July, 2021 ' ,score: 5 },
  { instances: 'NSG 2', status: '' ,submissionDate: '22nd July, 2021 ' , score: 5 },
  { instances: 'NSG 3', status: '' ,submissionDate: '22nd July, 2021 ' , score: 5 },
  { instances: 'NSG 4', status: '' ,submissionDate: '22nd July, 2021 ' ,score: 5  },
  { instances: 'NSG 5', status: '' ,submissionDate: '22nd July, 2021 ' ,score: 5  },
  { instances: 'NSG 6', status: '' ,submissionDate: '22nd July, 2021 ' ,score: 5  },
  { instances: 'NSG 7', status: '' ,submissionDate: '22nd July, 2021 ' , score: 5 },
  { instances: 'NSG 8', status: '' ,submissionDate: '22nd July, 2021 ' , score: 5 },
 
];
@Component({
  selector: 'ryzen-drawer-with-table',
  templateUrl: './drawer-with-table.component.html',
  styleUrls: ['./drawer-with-table.component.scss']
})
export class DrawerWithTableComponent implements OnInit {

  displayedColumns: string[] = ['instances', 'status','submissionDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
 // public gridService: GridService, (not in use)
     ) { }

  ngOnInit() {
  }

}
