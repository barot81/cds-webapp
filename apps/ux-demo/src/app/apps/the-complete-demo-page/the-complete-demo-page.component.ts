
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DemoPageDialogComponent } from './demo-page-dialog/demo-page-dialog.component';
import { zhealthcareDrawerFormService } from '../../ui/zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';
import { PageFacade } from '@zhealthcare/ux';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../student-grid/grid.service';


export interface PeriodicElement {
  name: string;
  address: string;
  phone: string;
  ein: string;
  programs: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'HCR ManorCare - Corporate, multi-site', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '123456', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '123456', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '123456', programs: 'ARC, ARC-RN, ARC-SLPA' },

];

@Component({
  selector: 'ryzen-the-complete-demo-page',
  templateUrl: './the-complete-demo-page.component.html',
  styleUrls: ['./the-complete-demo-page.component.scss']
})
export class TheCompleteDemoPageComponent implements OnInit {

  navigations = [
    {
      id: 'tab1',
      title: 'Tab1',
      type: 'item',
      url: '/admin/ux/apps/the-complete-demo-page/tab1'
    },
    {
      id: 'tab2',
      title: 'Tab2',
      type: 'item',
      url: '/admin/ux/ui/the-complete-demo-page'
    },
    {
      id: 'tab3',
      title: 'Tab3',
      type: 'item',
      url: '/admin/ux/ui/the-complete-demo-page'
    },
    {
      id: 'tab4',
      title: 'Tab4',
      type: 'item',
      url: '/admin/ux/ui/the-complete-demo-page'
    },
    {
      id: 'tab5',
      title: 'Tab5',
      type: 'item',
      url: '/admin/ux/ui/the-complete-demo-page'
    }
  ]

  //chips 
  public type: string = 'component';
  removable = true;
  chipList: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen'];
  
  remove(chip: string): void {
    const index = this.chipList.indexOf(chip);

    if (index >= 0) {
      this.chipList.splice(index, 1);
    }
  }
//chips end

  displayedColumns: string[] = ['name', 'address', 'phone', 'ein', 'programs'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];


  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];

  constructor(private pageFacade: PageFacade, public zhealthcareDrawerFormService: zhealthcareDrawerFormService,
    public gridService: GridService, public dialog: MatDialog, public _UXDemoDrawerService: UXDemoDrawerService) { }

  openDialog() {
    this.dialog.open(DemoPageDialogComponent,
      {
        width: '50vw'
      });
  }

  ngOnInit() {
    this.pageFacade.setPageTitle('Complete Demo Page');
  }

}





