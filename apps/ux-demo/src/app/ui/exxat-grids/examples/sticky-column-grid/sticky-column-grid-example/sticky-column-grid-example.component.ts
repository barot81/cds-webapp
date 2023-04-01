import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

export interface PeriodicElement {
  src: string;
  student_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan',
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD',
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy',
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla',
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan',
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD',
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy',
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla',
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan',
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD',
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy',
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla',
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Ahmed, Morgan',
  },
  { src: 'assets/images/avatars/alice.jpg', student_name: 'Ahmed, Hannah' },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Barnes, Issac - WD',
  },
  { src: 'assets/images/avatars/Blair.jpg', student_name: 'Barnes, Kimberly' },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Br, Stanley' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Brown, Jerica' },
  {
    src: 'assets/images/avatars/anna-strong.png',
    student_name: 'Brown, Kelsy',
  },
  {
    src: 'assets/images/avatars/Barrera.jpg',
    student_name: 'Campbell, Priscilla',
  },
  { src: 'assets/images/avatars/Boyle.jpg', student_name: 'Cao, Kelsi' },
  { src: 'assets/images/avatars/Christy.jpg', student_name: 'Conant, Julie' },
];

@Component({
  selector: 'exxat-sticky-column-grid-example',
  templateUrl: './sticky-column-grid-example.component.html',
  styleUrls: ['./sticky-column-grid-example.component.scss'],
})
export class StickyColumnGridExampleComponent {
  searchText: string;

  @Input('scroll_pointer') scroll_pointer: number = 0;

  statuses = [
    { value: 'Get Started', viewValue: 'Get Started' },
    { value: 'In Progress', viewValue: 'In Progress' },
    { value: 'Pending Review', viewValue: 'Pending Review' },
    { value: 'Approved', viewValue: 'Approved' },
    { value: 'Disapproved', viewValue: 'Disapproved' },
    { value: 'Expiring', viewValue: 'Expiring' },
    { value: 'Expired', viewValue: 'Expired' },
  ];

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();
  statuscontrol = new FormControl();
  tables = [0];

  constructor(private elem: ElementRef) {
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

    // The first two columns should be student_name and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'student_name';
  }

  //code for onclick single row select and outside table click event
  clicked: string = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#stickyColumnTable')
        .contains(event.target)
    ) {
      if (this.clickedRows.size) {
        this.highlightedRows = this.clickedRows;
      }
      this.clickedRows = new Set<PeriodicElement>();
    }
  }

  addRow(row) {
    if (this.clickedRows.size) {
      if (this.clickedRows.has(row)) {
        this.clickedRows = new Set<PeriodicElement>();
      } else {
        this.clickedRows = new Set<PeriodicElement>();
        this.clickedRows.add(row);
      }
    } else {
      this.clickedRows.add(row);
    }
    this.highlightedRows = new Set<PeriodicElement>();
  }
  //code for onclick single row select and outside table click event

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  //#endregion
}
