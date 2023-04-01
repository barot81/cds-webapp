import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from '@exxat/ux';

export interface PeriodicElement {
  name: string;
  address: string;
  phone: string;
  ein: string;
  programs: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'HCR ManorCare - Corporate, multi-site', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'ABC School', address: '1366 North M Street,Tulare, CA 93274', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },
  { name: 'Absoulute Health Care Solutions', address: 'One Thousand Fianna Way, Fort Smith, AR 72919, US', phone: '123456', ein: '', programs: 'CRC, CRC-RN, CRC-SLPA' },
  { name: 'Agency Medical Center', address: '313 West Winton Avenue, Hayward, CA 94514', phone: '123456', ein: '', programs: 'SCC, SCC-OTA, SCC-PTA' },
  { name: 'Allen Mortury', address: '1366 North M Street,Tulare, CA 9327', phone: '949-349-1289', ein: '', programs: 'ARC, ARC-RN, ARC-SLPA' },

];


@Component({
  selector: 'ryzen-exxat-site-demo-grid',
  templateUrl: './exxat-site-demo-grid.component.html',
  styleUrls: ['./exxat-site-demo-grid.component.scss']
})
export class ExxatSiteDemoGridComponent implements OnInit {

  @ViewChild('gray_header') $gray_header: ElementRef;
  @ViewChild('search_bar_filter_container') $search_bar_filter_container: ElementRef;

  displayedColumns: string[] = ['name', 'address', 'phone', 'ein', 'programs'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(public headerService: HeaderService, 
 // public gridService: GridService, (not in use)
     ) { }

  ngAfterViewInit() {
    setTimeout(() => {

      let gray_header_height = this.$gray_header.nativeElement.offsetHeight;
      let search_bar_filter_container = this.$search_bar_filter_container.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(gray_header_height + search_bar_filter_container);
    });

  }

  ngOnInit() {
  }

}
