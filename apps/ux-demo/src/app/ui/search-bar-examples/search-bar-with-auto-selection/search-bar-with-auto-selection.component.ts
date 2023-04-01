import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-search-bar-with-auto-selection',
  templateUrl: './search-bar-with-auto-selection.component.html',
  styleUrls: ['./search-bar-with-auto-selection.component.scss'],
})
export class SearchBarWithAutoSelectionComponent implements OnInit {
  searchItem = new FormControl();

  constructor() {}

  ngOnInit() {}
}
