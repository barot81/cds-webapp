import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../../student-grid/grid.service';

export interface PeriodicElement {
  icon: string;
  rotation:string;
  cohort: string;
  schedule: string;
  setting:string;
  numberOfStudent: string;
  supervisionType: string;
  slotType: string;
  noteForStudent:string;
  noteForSchool:string;
  rotationDetails: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { icon: '',  rotation: 'R1',rotationDetails: "", cohort: "Cohort 2020", schedule: "",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "",noteForStudent: '' , },
  { icon: '' ,rotation: 'R2 ', rotationDetails: "", cohort: "Cohort 2020", schedule: "",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "" ,noteForStudent: '' },
  { icon: '' ,rotation: 'R2 ', rotationDetails: "", cohort: "Cohort 2020", schedule: "",setting:"", numberOfStudent: "", noteForSchool: "",supervisionType: "", slotType: "" ,noteForStudent: '' },
  {  icon: '' ,rotation: 'R3 ',  rotationDetails: "", cohort: "Cohort 2020", schedule: " ",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "" ,noteForStudent: '' },
  {  icon: '' ,rotation: 'R3 ',  rotationDetails: "", cohort: "Cohort 2020", schedule: " ",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "" ,noteForStudent: '' },
  {  icon: '' ,rotation: 'R3 ',  rotationDetails: "", cohort: "Cohort 2020", schedule: " ",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "" ,noteForStudent: '' },
  {  icon: '' ,rotation: 'R3 ',  rotationDetails: "", cohort: "Cohort 2020", schedule: " ",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "" ,noteForStudent: '' },
  {  icon: '' ,rotation: 'R3 ',  rotationDetails: "", cohort: "Cohort 2020", schedule: " ",setting:"", numberOfStudent: "",noteForSchool: "", supervisionType: "", slotType: "" ,noteForStudent: '' },
];




@Component({
  selector: 'ryzen-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.scss']
})
export class AddSlotComponent implements OnInit {
  addSlotForm: FormGroup;

 
  status = new FormControl();

  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];
 


  locationList = [{ viewName: 'Orlado', value: 'orlado' },
  { viewName: 'Brazil', value: 'brazil' }];

  locationcontrol = new FormControl();
settingcontrol = new FormControl();
statuscontrol = new FormControl();
slotcontrol =  new FormControl();

settings = [
  { value: "Setting 1", viewValue: "Setting 1" },
  { value: "Setting 2", viewValue: "Setting 2" },
  { value: "Setting 3", viewValue: "Setting 3" },
];

locations = [
  { value: 'Catagory 1', viewValue: 'Location 1' },
  { value: 'Catagory 2', viewValue: 'Location 2' },
  { value: 'Catagory 3', viewValue: 'Location 3' }
];



slots = [
  { value: 'Type 1', viewValue: 'Type 1' },
  { value: 'Type 2', viewValue: 'Type 2' },
  { value: 'Type 3', viewValue: 'Type 3' }
];

displayedColumns: string[] = ['icon', 'rotationDetails', 'cohort', 'schedule','setting', 'numberOfStudent', 'supervisionType' , 'slotType' , 'noteForStudent', 'noteForSchool'];
dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(private fb: FormBuilder, public gridService: GridService) {
    this.addSlotForm = this.fb.group({
      location: [this.locationList[0].value]
    })
  }

  ngOnInit() {
  }

}

