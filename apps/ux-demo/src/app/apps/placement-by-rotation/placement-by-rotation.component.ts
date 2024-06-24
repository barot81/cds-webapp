import { Component, OnInit } from '@angular/core';
import { GridService } from '../student-grid/grid.service';
import { FormControl } from '@angular/forms';

export interface ButtonToggle {
  value: string;
  icon?: string;
  label: string;
}

@Component({
  selector: 'ryzen-placement-by-rotation',
  templateUrl: './placement-by-rotation.component.html',
  styleUrls: ['./placement-by-rotation.component.scss']
})
export class PlacementByRotationComponent implements OnInit {

 
  navigations = [
    {
      id: 'tab1',
      title: 'Tab 1',
      type: 'item',
      url: '/admin/ux/apps/placement-by-rotation/tab1'
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      type: 'item',
      url: '/admin/ux/apps/placement-by-rotation/tab2'
    },
    {
      id: 'tab3',
      title: 'Tab 3',
      type: 'item',
      url: '/admin/ux/apps/placement-by-rotation/tab3'
    },
    {
      id: 'tab4',
      title: 'Tab 4',
      type: 'item',
      url: '/admin/ux/apps/placement-by-rotation/tab4'
    },
    {
      id: 'tab5',
      title: 'Tab 5',
      type: 'item',
      url: '/admin/ux/apps/placement-by-rotation/tab5'
    },
    {
      id: 'tab6',
      title: 'Tab 6',
      type: 'item',
      url: '/admin/ux/apps/placement-by-rotation/tab6'
    }
  ];


  buttonList: Array<ButtonToggle> = [
    { value: 'Card View', label: 'Card view', icon: 'fa-solid fa-bring-forward' },
    { value: 'Grid View', label: 'Grid view', icon: 'fal fa-th' }
  ];

  constructor(public gridService: GridService) { }



  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];
  
  
  dateList = [
    { value: "20 may , 2020", viewValue: "20 may , 2020" },
    { value: "21 may , 2020", viewValue: "21 may , 2020" },
    { value: "22 may , 2020", viewValue: "22 may , 2020" }
  ];

  ngOnInit() {
  }

}
