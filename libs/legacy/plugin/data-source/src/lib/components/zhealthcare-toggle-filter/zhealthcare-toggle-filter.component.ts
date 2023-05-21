import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zhc-toggle-filter',
  templateUrl: './zhealthcare-toggle-filter.component.html',
  styleUrls: ['./zhealthcare-toggle-filter.component.scss']
})
export class zhealthcareToggleFilterComponent implements OnInit {

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
