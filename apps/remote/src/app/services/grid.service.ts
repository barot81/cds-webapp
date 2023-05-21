import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { Filter } from '@zhealthcare/plugin/data-source';
import { BehaviorSubject, Subject } from 'rxjs';
import { EditColumnsComponent } from '../patients/edit-columns/edit-columns.component';
import { FilterDrawerComponent } from '../patients/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../patients/show-more-filter-drawer/show-more-filter-drawer.component';

@Injectable({ providedIn: 'any' })
export class GridService extends ComponentMap {
  reloadFilter = new Subject();
  public onFilterChange$: BehaviorSubject<boolean>;
  private appliedFilters: Filter[] = [];
  constructor() {
    super();
    this.add('ryzen-edit-columns', EditColumnsComponent);
    this.add('ryzen-filter-drawer', FilterDrawerComponent);
    this.add('ryzen-show-more-filter-drawer', ShowMoreFilterDrawerComponent);
    this.onFilterChange$ = new BehaviorSubject<boolean>(false);
  }

  getAppliedFilters() {
    return this.appliedFilters;
  }
  setAppliedFilters(filters: Filter[]) {
    this.appliedFilters = filters;
    this.onFilterChange$.next(true);
  }
}
