import { Component, OnInit } from '@angular/core';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../../student-grid/grid.service';



export interface PeriodicElement {
  document: string;
  icon: string;
  category: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { icon: 'fa-file-excel primary-fg', document: 'Textbookxyz.xlsx', category: 'Grading', date: '10 December 2020' },
  { icon: 'fa-file-word indigo-fg', document: 'Textbookxyz.doc', category: 'Grading', date: '10 December 2020' },
  { icon: 'fa-file-excel primary-fg', document: 'Grading document.xlsx', category: 'Grading', date: '10 December 2020' },
  { icon: 'fa-file-alt grey-fg', document: 'Textbookxyz.txt', category: 'Grading', date: '10 December 2020' },
  { icon: 'fa-file-word indigo-fg', document: 'Policy.doc', category: 'Policy', date: '10 December 2020', }
];

@Component({
  selector: 'ryzen-resources-demo',
  templateUrl: './resources-demo.component.html',
  styleUrls: ['./resources-demo.component.scss']
})
export class ResourcesDemoComponent implements OnInit {


  displayedColumns: string[] = ['document', 'date', 'category', 'action'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(public gridService: GridService, public _PlanAppDemoDrawerService: PlanAppDemoDrawerService) { }

  ngOnInit() {
  }

}
