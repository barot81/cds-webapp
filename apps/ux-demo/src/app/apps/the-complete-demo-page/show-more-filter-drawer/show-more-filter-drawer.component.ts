import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-show-more-filter-drawer',
  templateUrl: './show-more-filter-drawer.component.html'
})
export class ShowMoreFilterDrawerComponent implements OnInit {
  constructor() {}
  //chips
  public type = 'component';
  removable = true;
  chipList: string[] = [
    'one',
    'two',
    'three',
    'five',
    'six',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen'
  ];
  chipList1: string[] = ['four', 'seven'];
  chipList2: string[] = ['eight'];

  remove(chip: string): void {
    const index = this.chipList.indexOf(chip);

    if (index >= 0) {
      this.chipList.splice(index, 1);
    }
  }
  //chips end
  ngOnInit() {}

  clearAllChips() {
    this.chipList = [];
  }

  reset() {
    this.chipList = [
      'one',
      'two',
      'three',
      'five',
      'six',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen'
    ];
    this.chipList1 = ['four', 'seven'];
    this.chipList2 = ['eight'];
  }
}
