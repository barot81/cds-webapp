import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  code: string;
  title: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { code: 'A101', title: 'Hydrogen' },
  { code: 'A102', title: 'Hydrogen1' },
  { code: 'A103', title: 'Hydrogen2' },
  { code: 'A104', title: 'Hydrogen3' },
  { code: 'A105', title: 'Hydrogen4' }
];


@Component({
  selector: 'ryzen-zhealthcare-weekday-picker',
  templateUrl: './zhealthcare-weekday-picker.component.html',
  styleUrls: ['./zhealthcare-weekday-picker.component.scss']
})
export class zhealthcareWeekdayPickerComponent implements OnInit {

  @ViewChild('search_table') search_table: ElementRef;

  displayedColumns: string[] = ['code', 'title'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  public type: string = 'component';

  chipList: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private renderer: Renderer2) {
    this.dataSource.data = ELEMENT_DATA;
  }

  ngOnInit() {
  }

  additems() {
    this.dataSource.data.forEach(element => {
      this.dataSource.data.push(element);
      this.dataSource.data.push(element);
    });

    this.dataSource.data = this.dataSource.data;

    this.scrollToElement('search_container');
    this.renderer.setStyle(this.search_table.nativeElement, 'height', '525px');
    this.renderer.setStyle(this.search_table.nativeElement, 'overflow', 'auto');
  }

  scrollToElement($element): void {

    var element = document.getElementById($element);

    element.scrollIntoView();
  }
}
