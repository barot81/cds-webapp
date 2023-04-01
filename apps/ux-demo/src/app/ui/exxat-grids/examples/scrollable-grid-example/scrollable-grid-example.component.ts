import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService, FlexTableService } from '@exxat/ux';

export interface PeriodicElement {
  src: string;
  student: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
  { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
  { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
  { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
  { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
  { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
  { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' }
];


@Component({
  selector: 'ryzen-scrollable-grid-example',
  templateUrl: './scrollable-grid-example.component.html',
})
export class ScrollableGridExampleComponent implements OnInit, AfterViewInit {

  statuses = [
    { value: "Get Started", viewValue: "Get Started" },
    { value: "In Progress", viewValue: "In Progress" },
    { value: "Pending Review", viewValue: "Pending Review" },
    { value: "Approved", viewValue: "Approved" },
    { value: "Disapproved", viewValue: "Disapproved" },
    { value: "Expiring", viewValue: "Expiring" },
    { value: "Expired", viewValue: "Expired" }
  ];

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  tables = [0];

  constructor(public headerService: HeaderService, private readonly _flexTableService: FlexTableService) {

    this.displayedColumns.length = 18;
    this.displayedColumns.fill('is', 1, 2);
    this.displayedColumns.fill('mmr', 2, 3);
    this.displayedColumns.fill('flu', 3, 4);
    this.displayedColumns.fill('tb', 4, 5);
    this.displayedColumns.fill('hepb', 5, 6);
    this.displayedColumns.fill('varicella', 6, 7);
    this.displayedColumns.fill('tdap', 7, 8);
    this.displayedColumns.fill('hi', 8, 9);
    this.displayedColumns.fill('cpr', 9, 10);
    this.displayedColumns.fill('pals', 10, 11);
    this.displayedColumns.fill('licensure', 11, 12);
    this.displayedColumns.fill('hipaa', 12, 13);
    this.displayedColumns.fill('sis', 13, 14);
    this.displayedColumns.fill('corf', 14, 15);
    this.displayedColumns.fill('ds', 15, 16);
    this.displayedColumns.fill('bgc', 16, 17);
    this.displayedColumns.fill('fp', 17, 18);

    // The first two columns should be student and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'student';

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(0);
      this._flexTableService.TriggerChangeDetection(true);
    });
  }
}
