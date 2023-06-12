import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { Filter } from '@zhealthcare/plugin/data-source';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterDrawerComponent } from '../patients/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../patients/show-more-filter-drawer/show-more-filter-drawer.component';

@Injectable({ providedIn: 'any' })
export class GridService extends ComponentMap {
  reloadFilter = new Subject();
  public onFilterChange$: BehaviorSubject<boolean>;
  private appliedFilters: Filter[] = [];
  constructor() {
    super();
    this.add('ryzen-filter-drawer', FilterDrawerComponent);
    this.add('ryzen-show-more-filter-drawer', ShowMoreFilterDrawerComponent);
    this.onFilterChange$ = new BehaviorSubject<boolean>(false);
  }

  getAppliedFilters() {
    return this.appliedFilters;
  }

  resetAppliedFilters() {
    this.appliedFilters = [...[]];
  }

  setAppliedFilters(filters: Filter[]) {
    this.appliedFilters = filters;
    this.onFilterChange$.next(true);
  }

  removeFilter(value: string, displayName: string) {
    const currentFilterIndex = this.appliedFilters.findIndex(x=>x.displayName === displayName && x.value === value);
    this.appliedFilters = [...this.appliedFilters.slice().splice(currentFilterIndex,1)];
  }
}
