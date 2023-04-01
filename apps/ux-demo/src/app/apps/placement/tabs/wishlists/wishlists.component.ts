import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../../student-grid/grid.service';
import { FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';
import { UXDemoDrawerService } from 'apps/ux-demo/src/app/remote-entry/ux-demo-drawer.service';
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
  selector: 'ryzen-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})

export class WishlistsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'placementDetail', 'rotation', 'staff', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  locationList = [{ viewName: 'Orlado', value: 'orlado' },
  { viewName: 'Brazil', value: 'brazil' }];

  locationcontrol = new FormControl();

  locations = [
    { value: 'Catagory 1', viewValue: 'Sites' },
    { value: 'Catagory 2', viewValue: 'Students' }
  ];

  constructor(public gridService: GridService, public headerService: HeaderService,public _uxDemoDrawerService: UXDemoDrawerService, private _fuseSidebarService: FuseSidebarService) { }

  ngOnInit() {
  }

    
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}