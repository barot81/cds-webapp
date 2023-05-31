/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import {
  DataSourceFacade,
  Filter,
  FusionDataSource,
} from '@zhealthcare/plugin/data-source';
import { TagView, zhealthcareTag } from '@zhealthcare/plugin/tags';
import { DrawerService } from '@zhealthcare/ux';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { GridService } from '../../services/grid.service';
import { SidebarFocusHelper } from '../../services/sidebar-helper.service';

export interface filterListItem {
  id: string;
  title: string;
  count: number;
}

export interface statusBadge {
  id: string;
  title: string;
}

@Component({
  selector: 'ryzen-filter-drawer',
  templateUrl: './filter-drawer.component.html',
})
export class FilterDrawerComponent
  extends FusionFormComponent
  implements FusionFormAdapter, OnInit, OnDestroy
{
  private readonly _unsubscribe: Subject<any>;
  tags: Array<zhealthcareTag> = [
    {
      id: Math.random(),
      name: 'Tag with 30 characters allowed',
      color: 'indigo-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 2 1 Tag Lorem i',
      color: 'deep-orange-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 3',
      color: 'pink-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 4 Bigger Text 4',
      color: 'blue-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 5',
      color: 'gray-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 6',
      color: 'purple-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 7 Bigger Text',
      color: 'yellow-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 8 Bigger Text 8 ',
      color: 'green-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 9',
      color: 'pink-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 10 Bigger Text',
      color: 'indigo-500',
      isChecked: true,
    },
  ];

  getTagTitle(tag: zhealthcareTag): string {
    if (tag && tag !== null) {
      return tag.name && tag.name !== null ? tag.name : tag.title;
    }
  }

  getTagColor(tag: zhealthcareTag): string {
    if (tag && tag !== null) {
      return tag.color && tag.color !== null ? tag.color : tag.colorCode;
    }
  }

  public tagView = TagView;

  selectedId: string;
  selectedStatusCount = 0;
  selectedQueryStatusCount = 0;

  filterList: filterListItem[] = [
    { id: 'reviewStatus', title: 'Review Status', count: 0 },
    { id: 'queryStatus', title: 'Query Status', count: 0 },
    { id: 'admitDate', title: 'Admission Date', count: 0 }
  ];

  statusList = [
    { name: 'New', isSelected: false },
    { name: 'No Reviewed', isSelected: false },
    { name: 'Later Review', isSelected: false },
    { name: 'No Query', isSelected: false },
    { name: 'Non DRG', isSelected: false },
  ];
  queryStatusList = [
    { name: 'Pending', isSelected: false },
    { name: 'Answered', isSelected: false },
    { name: 'Completed', isSelected: false },
    { name: 'Dropped', isSelected: false },
    { name: 'No Response', isSelected: false },
  ];

  constructor(
    public _focus: SidebarFocusHelper,
    private fb: FormBuilder,
    private dataSourceFacade: DataSourceFacade,
    public drawerService: DrawerService,
    private gridService: GridService
  ) {

    super();
    this._unsubscribe = new Subject();
    this.selectedId = this.filterList[0].id;
    this.fusionFormGroup = this.fb.group({
      reviewStatus: new FormControl([]),
      queryStatus: new FormControl([]),
      admissionStartDate: new FormControl(''),
      admissionEndDate: new FormControl('')
    });
  }

  ngOnInit() {
    this.dataSourceFacade.fusionDataSource$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((x) => {
        if (x && x.filters?.length > 0) {
          this.setFilterValue(x);
        }
        this.updateCount();
      });
    this.updateCount();
    this.drawerService.setPrimaryActionState(false, false);
  }

  setFilterValue(dataSource: FusionDataSource) {
    dataSource.filters
      .filter((x) => x.fieldName === 'Filters.ReviewStatus')
      .forEach(x => {
        this.statusList.find((y) => y.name === x.value).isSelected = true;
        console.log(this.statusList.find((y) => y.name === x.value).isSelected);
      });

    dataSource.filters
      .filter((x) => x.fieldName === 'Filters.QueryStatus')
      .forEach(x => this.queryStatusList.find((y) => y.name === x.value).isSelected = true);

    const stDate = dataSource.filters.find(x => x.fieldName == 'Filters.AdmissionStartDate')?.value;
    const astDate = stDate ? moment(stDate, 'MM/DD/YYYY'): '';
    const endDate = dataSource.filters.find(x => x.fieldName == 'Filters.AdmissionEndDate')?.value;
    const aendDate = endDate ? moment(endDate, 'MM/DD/YYYY') : '';
    this.fusionFormGroup.patchValue({
      status: this.statusList.filter((x) => x.isSelected),
      queryStatus: this.queryStatusList.filter((x) => x.isSelected),
      admissionStartDate: astDate,
      admissionEndDate: aendDate
    });
  }

  updateCount() {
    this.selectedStatusCount = this.statusList.filter(
      (x) => x.isSelected
    ).length;
    this.selectedQueryStatusCount = this.queryStatusList.filter(
      (x) => x.isSelected
    ).length;
    this.filterList.find((x) => x.id === 'reviewStatus').count =
      this.selectedStatusCount;
    this.filterList.find((x) => x.id === 'queryStatus').count =
      this.selectedQueryStatusCount;
      this.filterList.find(x=>x.id === 'admitDate').count = this.fusionFormGroup.controls['admissionStartDate'].value ? 1 : 0;
  }

  navigateToFilterListItem(id: string) {
    this._focus.shiftFocus();
    this.selectedId = id;
  }

  selectAll(name: string) {
    if (name === 'reviewStatus') {
      this.statusList.map((x) => (x.isSelected = true));
      this.selectedStatusCount = this.statusList.length;
      this.filterList.find((x) => x.id === 'reviewStatus').count = this.selectedStatusCount;
    } else if (name === 'queryStatus') {
      this.queryStatusList.map((x) => (x.isSelected = true));
      this.selectedQueryStatusCount = this.queryStatusList.length;
      this.filterList.find((x) => x.id === 'queryStatus').count = this.selectedStatusCount;
    }

  }

  onStatusChange(isChecked: boolean, value: string) {
    this.statusList.find((x) => x.name === value.trim()).isSelected = isChecked;
    this.selectedStatusCount = this.statusList.filter(
      (x) => x.isSelected
    ).length;
    this.filterList.find((x) => x.id === 'reviewStatus').count = this.selectedStatusCount;
  }

  onQueryStatusChange(isChecked: boolean, value: string) {
    this.queryStatusList.find((x) => x.name === value.trim()).isSelected =
      isChecked;
    this.selectedQueryStatusCount = this.queryStatusList.filter(
      (x) => x.isSelected
    ).length;
    this.filterList.find((x) => x.id === 'queryStatus').count = this.selectedStatusCount;

  }

  reset(name: string) {
    if (name === 'reviewStatus') {
      this.statusList.forEach((x) => (x.isSelected = false));
      this.selectedStatusCount = 0;
      this.filterList.find((x) => x.id === 'reviewStatus').count = 0;
    } else if (name === 'queryStatus') {
      this.queryStatusList.forEach((x) => (x.isSelected = false));
      this.selectedQueryStatusCount = 0;
      this.filterList.find((x) => x.id === 'queryStatus').count = 0;
    }
  }

  dateChange(propName: string, $event) {
    this.fusionFormGroup.controls[propName].setValue($event.value);
    this.filterList.find(x=>x.id === 'admitDate').count = this.fusionFormGroup.controls[propName]?.value ? 1 : 0;
  }

  resetAllFilters() {
    this.fusionFormGroup.patchValue({
      status: '',
      queryStatus: '',
      admissionStartDate: '',
      admissionEndDate: ''
    });
    this.reset('reviewStatus');
    this.reset('queryStatus');
    this.filterList.forEach(x=>x.count = 0);
  }

  primaryAction() {
    const filters: Filter[] = [];
    const selectedStatus = this.statusList.filter((x) => x.isSelected);
    if (selectedStatus.length > 0) {
      selectedStatus.forEach((ele) => {
        filters.push({
          fieldName: 'Filters.ReviewStatus',
          value: ele.name,
          operator: 'eq',
          type: 'dropdown',
          displayName: 'Review Status',
        });
      });
    }
    const selectedQueryStatus = this.queryStatusList.filter(
      (x) => x.isSelected
    );
    if (selectedQueryStatus.length > 0) {
      selectedQueryStatus.forEach((ele) => {
        filters.push({
          fieldName: 'Filters.QueryStatus',
          value: ele.name,
          operator: 'eq',
          type: 'dropdown',
          displayName: 'Query Status',
        });
      });
    }
    const fieldsMapping = [
      {
        controlName: 'admissionStartDate',
        filterName: 'Filters.AdmissionStartDate',
      },
      {
        controlName: 'admissionEndDate',
        filterName: 'Filters.AdmissionEndDate',
      }
    ];
    fieldsMapping.forEach((prop) => {
      const fieldValue = this.fusionFormGroup.controls[prop.controlName].value;
      if (fieldValue) {
        filters.push({
          fieldName: prop.filterName,
          value: this.convertDateToString(fieldValue),
          operator: 'eq',
          displayName: prop.controlName,
        });
      }
    });
    this.dataSourceFacade.updateAllDataSourceFilter(filters);
    this.gridService.setAppliedFilters(filters);
  }

  convertDateToString(date) {
    return `${date.month()+1}/${date.date()}/${date.year()}`;
  }

  secondaryAction() {}
  panelClose() {}

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
