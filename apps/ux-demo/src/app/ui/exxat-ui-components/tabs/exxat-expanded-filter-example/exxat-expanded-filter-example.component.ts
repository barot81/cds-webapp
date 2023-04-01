import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-exxat-expanded-filter-example',
  templateUrl: './exxat-expanded-filter-example.component.html',
})
export class ExxatExpandedFilterExampleComponent implements OnInit {

  cohort = new FormControl();

  cohortList: string[] = ['Class 2020', 'Class 2021', 'Class 2022', 'Class 2023', 'Class 2024'];

  constructor() { }

  ngOnInit() {
  }

  remove(item: any): void {
    const index = this.cohort.value.indexOf(item);

    if (index >= 0) {
      this.cohort.value.splice(index, 1);
    }
  }

  clearFilter() {
    this.cohort.reset();
  }
}
