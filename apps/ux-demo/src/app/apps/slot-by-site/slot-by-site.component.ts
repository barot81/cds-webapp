import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../student-grid/grid.service';
import { FuseSidebarService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  slotsOffered: string;
  schedule: number;
  slotsAvailable: number;
  slotsFilled: string;
  actions:string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { schedule: 1, slotsOffered: 'Hydrogen', slotsAvailable: 1.0079, slotsFilled: 'H',actions: 'three' },
  { schedule: 2, slotsOffered: 'Helium', slotsAvailable: 4.0026, slotsFilled: 'He' ,actions: 'three'},
  { schedule: 3, slotsOffered: 'Lithium', slotsAvailable: 6.941, slotsFilled: 'Li' ,actions: 'three'},
  { schedule: 4, slotsOffered: 'Beryllium', slotsAvailable: 9.0122, slotsFilled: 'Be',actions: 'three' },
];


@Component({
  selector: 'ryzen-slot-by-site',
  templateUrl: './slot-by-site.component.html',
  styleUrls: ['./slot-by-site.component.scss']
})
export class SlotBySiteComponent implements OnInit {

 
  navigations = [
    {
      id: 'tab1',
      title: 'Tab 1',
      type: 'item',
      url: '/admin/ux/apps/Slot_By_Site_Demo/tab1'
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      type: 'item',
      url: '/admin/ux/apps/Slot_By_Site_Demo/tab2'
    },
    {
      id: 'tab3',
      title: 'Tab 3',
      type: 'item',
      url: '/admin/ux/apps/Slot_By_Site_Demo/tab3'
    },
    {
      id: 'tab4',
      title: 'Tab 4',
      type: 'item',
      url: '/admin/ux/apps/Slot_By_Site_Demo/tab4'
    },
    {
      id: 'tab5',
      title: 'Tab 5',
      type: 'item',
      url: '/admin/ux/apps/Slot_By_Site_Demo/tab5'
    },
    {
      id: 'tab6',
      title: 'Tab 6',
      type: 'item',
      url: '/admin/ux/apps/Slot_By_Site_Demo/tab6'
    }
  ];

  constructor(public gridService: GridService, private _fuseSidebarService: FuseSidebarService) { }


  displayedColumns: string[] = ['schedule', 'slotsOffered', 'slotsAvailable', 'slotsFilled', 'actions'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];
  

  ngOnInit() {
  }

}
