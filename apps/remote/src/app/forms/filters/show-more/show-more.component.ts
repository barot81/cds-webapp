import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@zhealthcare/fusion/core';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { DataSourceFacade, Filter, FusionDataSource } from '@zhealthcare/plugin/data-source';
import { DrawerAdapter, DrawerService } from '@zhealthcare/ux';
import { takeUntil, Subject } from 'rxjs';
import lodash from 'lodash';
import { ShowMore } from '../../../models/show-more.model';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'profile-show-more',
  templateUrl: './show-more.component.html',
})
export class StudentShowMoreComponent extends FusionFormComponent
  implements OnInit, DrawerAdapter, OnDestroy {
  private readonly _unsubscribe: Subject<any>;
  showMoreFlters: ShowMore[];
  key: string;
  constructor(private readonly dataSourceFacade: DataSourceFacade,
    public drawerService: DrawerService,
    public _reportFilterService: PatientService) {
    super();
    this._unsubscribe = new Subject();
    this.showMoreFlters = new Array<ShowMore>();
  }

  clearFilters(key: string, value: string, filterData: Filter) {
    const currValue = filterData.value.trim().split('~');
    const filterValue = currValue.filter((x) => x !== key.trim()).join('~');
    const index = this.showMoreFlters.findIndex(x => x.fieldName === filterData.fieldName);
    if (index > -1) {
      this.showMoreFlters[index].value = filterValue;
      this.showMoreFlters[index].filterValue.delete(key);

    }
    // Logger.trace(
    //   `StudentModule : SearchComponent => clearFilters()=> all filter cleared`
    // );
  }

  createFilter(filter: Filter) {
    return filter;
  }
  primaryAction() {
    const allfilters = [];
    const filterResponse = this.showMoreFlters.filter(x => allfilters.push(this.createFilter(x)))
    if (this.key === 'graphical') {
      this.updateAllDataSourceFilter(allfilters.filter(x => x.value !== ''));
    } else {
      this.dataSourceFacade.updateAllDataSourceFilter(allfilters);
    }
  }

  updateAllDataSourceFilter(filters: Filter[]) {
    const studentFusionDataSource: FusionDataSource = JSON.parse(localStorage.getItem('fusionDataSource'));
    if (studentFusionDataSource.filters !== undefined) {
      const searchFilter = studentFusionDataSource.filters.filter(x => x.type === 'search');
      searchFilter.forEach(x => {
        if (x !== undefined && x !== null && x.value !== '') {
          filters.push(x);
        }
      })
    }
    studentFusionDataSource.filters = filters;
    localStorage.setItem('fusionDataSource', JSON.stringify(studentFusionDataSource));
    // this._reportFilterService.onGraphicalFilterChange.next(filters);
  }
  secondaryAction() {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
   // this._reportFilterService.closeFilterDrawer.next(false);
  }

  ngOnInit(): void {
    this.showMoreFlters = lodash.cloneDeep(this.data);
    this._reportFilterService.closeFilterDrawer.pipe(takeUntil(this._unsubscribe)).subscribe(istrue => {
      if (istrue) {
        this.drawerService.closeDrawer();
      }
    })
  }

}
