import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../../student-grid/grid.service';
import { HeaderService } from '@exxat/ux';
import { FormControl } from '@angular/forms';
export interface PeriodicElement {
  name: string,
  statusClass:string,
  src: string,
  placementDetail: string;
  rotation: string;
  staff: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name:'Ageless medical center' ,src: "assets/images/avatars/anna-strong.png", placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"success" },
  { src: "assets/images/avatars/alice.jpg", name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"warning" },
  { src: "assets/images/avatars/Barrera.jpg", name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"" },
  { src: "assets/images/avatars/Blair.jpg",name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"error" },
  { src: "assets/images/avatars/anna-strong.png", name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"info" },
  { src: "assets/images/avatars/Boyle.jpg", name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"warning" },
  { name:'Ageless medical center', src: "assets/images/avatars/anna-strong.png", placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"success" },
  { src: "assets/images/avatars/anna-strong.png", name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"info" },
  { src: "assets/images/avatars/Boyle.jpg", name:'Ageless medical center', placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"success" },
  { name:'Ageless medical center', src: "assets/images/avatars/anna-strong.png", placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"" },
  {name:'Ageless medical center', src: "assets/images/avatars/anna-strong.png", placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"info" },
  { name:'Ageless medical center', src: "assets/images/avatars/anna-strong.png", placementDetail: "Emergency Medicine", rotation: "", staff: "Critical Care", status: "Oncology",statusClass:"success" }
];


@Component({
  selector: 'ryzen-notofications',
  templateUrl: './notofications.component.html',
  styleUrls: ['./notofications.component.scss']
})
export class NotoficationsComponent implements OnInit {
  displayedColumns: string[] = ['select','name', 'placementDetail', 'rotation', 'staff', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  locationList = [{ viewName: 'Orlado', value: 'orlado' },
  { viewName: 'Brazil', value: 'brazil' }];

  locationcontrol = new FormControl();

  locations = [
    { value: 'Catagory 1', viewValue: 'Sites' },
    { value: 'Catagory 2', viewValue: 'Students' }
  ];

  constructor(public gridService: GridService, public headerService: HeaderService) { }

  ngOnInit() {
  }

}
