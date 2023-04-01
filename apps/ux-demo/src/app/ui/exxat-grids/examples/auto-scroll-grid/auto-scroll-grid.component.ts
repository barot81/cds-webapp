import { Component, OnInit, Renderer2 } from '@angular/core';
import { GoToColumnComponent, HeaderService } from '@exxat/ux';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, } from 'rxjs/operators';

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
  selector: 'ryzen-auto-scroll-grid',
  templateUrl: './auto-scroll-grid.component.html',
})
export class AutoScrollGridComponent extends GoToColumnComponent implements OnInit {

  selectedColumn: string;
  columnControl = new FormControl();
  filteredOptions: Observable<string[]>;
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

  ngOnInit() {
    this.filteredOptions = this.columnControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.columnControl.valueChanges.subscribe(data => {
      if (data && data.length > 0) {
        this.selectedColumn = data;
        if (this.displayedColumns.includes(this.selectedColumn)) {
          this.scrollToColumn(this.selectedColumn, 600);
        }
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.displayedColumns.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(public headerService: HeaderService, public renderer: Renderer2) {
    super(renderer);
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(0);
    });
  }
}
