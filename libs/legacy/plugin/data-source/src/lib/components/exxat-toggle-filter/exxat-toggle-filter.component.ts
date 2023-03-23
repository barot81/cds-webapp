import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'exxat-toggle-filter',
  templateUrl: './exxat-toggle-filter.component.html',
  styleUrls: ['./exxat-toggle-filter.component.scss']
})
export class ExxatToggleFilterComponent implements OnInit {

  @Input() filterList;
  selectedFilter: string;

  constructor() { }

  ngOnInit() {
  }

  onClick(filter: string) {
    this.selectedFilter = filter;
    console.log(this.selectedFilter);

  }
}
