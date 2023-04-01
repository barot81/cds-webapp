import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@exxat/ux';
import { MatTableDataSource } from '@angular/material/table';
import { GridService } from '../../../../apps/student-grid/grid.service';

export interface PeriodicElement {
  firstName: string,
  lastName: string,
  statusClass: string,
  src: string,
  rotation1: string;
  rotation2: string;
  rotation3: string;
  rotation4: string;
  unassignedSetting: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { firstName: 'Anna', lastName: 'Strong', src: "assets/images/avatars/anna-strong.png", rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "success" },
  { src: "assets/images/avatars/alice.jpg", firstName: 'Barragan', lastName: 'Laurrel', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "warning" },
  { src: "assets/images/avatars/Barrera.jpg", firstName: 'Winkfield', lastName: 'Strong', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "" },
  { src: "assets/images/avatars/Blair.jpg", firstName: 'Barragan', lastName: 'Laurrel', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "error" },
  { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "info" },
  { src: "assets/images/avatars/Boyle.jpg", firstName: 'PWelson', lastName: 'Strong', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "warning" },
  { firstName: 'Anna', lastName: 'Strong', src: "assets/images/avatars/anna-strong.png", rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "success" },
  { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "info" },
  { src: "assets/images/avatars/Boyle.jpg", firstName: 'PWelson', lastName: 'Strong', rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "success" },
  { firstName: 'Anna', lastName: 'Strong', src: "assets/images/avatars/anna-strong.png", rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "" },
  { firstName: 'Anna', lastName: 'Strong', src: "assets/images/avatars/anna-strong.png", rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "info" },
  { firstName: 'Anna', lastName: 'Strong', src: "assets/images/avatars/anna-strong.png", rotation1: "Emergency Medicine", rotation2: "", rotation3: "Critical Care", rotation4: "Oncology", unassignedSetting: "", statusClass: "success" }
];

@Component({
  selector: 'ryzen-exxat-grids-example1',
  templateUrl: './exxat-grids-example1.component.html',
  styleUrls: ['./exxat-grids-example1.component.scss']
})
export class ExxatGridsExample1Component implements OnInit {

  displayedColumns: string[] = ['name', 'rotation1', 'rotation2', 'rotation3', 'rotation4', 'unassignedSetting'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(public gridService: GridService, public headerService: HeaderService) { }

  ngOnInit() {
  }

}
