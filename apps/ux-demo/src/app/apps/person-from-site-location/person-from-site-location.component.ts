
import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../student-grid/grid.service';


export interface PeriodicElement {
  noOfStudent: string;
  availabilityDate: number;
  precepter: number;
  setting: string;
  actions:string;
  slotType:string;
  supervision:string;
  notes:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { availabilityDate: 1, noOfStudent: 'Hydrogen', precepter: 1.0079, setting: 'H',actions: 'three',slotType:'',supervision:'',notes:'' },
  { availabilityDate: 2, noOfStudent: 'Helium', precepter: 4.0026, setting: 'He' ,actions: 'three',slotType:'',supervision:'',notes:''},
  { availabilityDate: 3, noOfStudent: 'Lithium', precepter: 6.941, setting: 'Li' ,actions: 'three',slotType:'',supervision:'',notes:''},
  { availabilityDate: 4, noOfStudent: 'Beryllium', precepter: 9.0122, setting: 'Be',actions: 'three' ,slotType:'',supervision:'',notes:''},
];


@Component({
  selector: 'ryzen-person-from-site-location',
  templateUrl: './person-from-site-location.component.html',
  styleUrls: ['./person-from-site-location.component.scss']
})
export class PersonFromSiteLocationComponent implements OnInit {


  constructor(private _fuseSidebarService: FuseSidebarService, public gridService: GridService) {
   
  }

  displayedColumns: string[] = ['actions','availabilityDate', 'noOfStudent', 'precepter', 'setting','slotType' , 'supervision','notes'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngOnInit() {
  }


  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}












