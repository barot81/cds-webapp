import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { EditColumnsComponent } from '../patients/edit-columns/edit-columns.component';
import { FilterAndEditDrawerComponent } from '../patients/filter-and-edit-drawer/filter-and-edit-drawer.component';
import { FilterDrawerComponent } from '../patients/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../patients/show-more-filter-drawer/show-more-filter-drawer.component';

@Injectable({providedIn: 'any'})
export class GridService extends ComponentMap {

  constructor() {
    super();
    this.add('ryzen-edit-columns', EditColumnsComponent);
    this.add('ryzen-filter-drawer', FilterDrawerComponent);
    this.add('ryzen-filter-and-edit-drawer', FilterAndEditDrawerComponent);
    this.add('ryzen-show-more-filter-drawer', ShowMoreFilterDrawerComponent);
  }
}
