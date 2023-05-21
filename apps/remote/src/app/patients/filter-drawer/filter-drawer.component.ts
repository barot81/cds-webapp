/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import { DataSourceFacade, Filter, FusionDataSource } from '@zhealthcare/plugin/data-source';
import { TagView, zhealthcareTag } from '@zhealthcare/plugin/tags';
import { DrawerService, ThemeSelectionComponent } from '@zhealthcare/ux';
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
  implements FusionFormAdapter, OnInit
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

  filterFormGroup: FormGroup;
  selectedStatus = [];
  selectedQueryStatus = [];

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

  searchItem = new FormControl();

  filterList: filterListItem[] = [
    { id: 'status-filter', title: 'Status', count: 0 },
    { id: 'query-status-filter', title: 'Query Status', count: 0 },
    { id: 'admit-date-filter', title: 'Admission Date', count: 0 },
    { id: 'discharge-date-filter', title: 'Discharge Date', count: 0 },
  ];

  statusList = ['New', 'Reviewed', 'Later Review', 'No Query', 'Non DRG'];
  queryStatusList = [
    'Pending',
    'Answered',
    'Completed',
    'Dropped',
    'No Response',
  ];

  constructor(
    public _focus: SidebarFocusHelper,
    private fb: FormBuilder,
    private dataSourceFacade: DataSourceFacade,
    public drawerService: DrawerService,
    private gridService: GridService

  ) {
    super();
    this.selectedId = this.filterList[0].id;
    this.filterFormGroup = this.fb.group({
      status: new FormControl(''),
      queryStatus: new FormControl(''),
      admissionStartDate: new FormControl(''),
      admissionEndDate: new FormControl(''),
      dischargeStartDate: new FormControl(''),
      dischargeEndDate: new FormControl(''),
    });
  }

  ngOnInit() {
    this.selectedStatus = [];
    this.selectedQueryStatus = [];
    this.dataSourceFacade.fusionDataSource$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((x) => {
        if (x !== undefined && x !== null && x.filters?.length > 0) {
          this.setFilterValue(x);
        }
        this.updateCount();
      });
    this.updateCount();
    this.drawerService.setPrimaryActionState(false, false);
  }

  setFilterValue(dataSource: FusionDataSource) {
    this.fusionFormGroup.patchValue({
      status: dataSource.filters.filter(x=>x.fieldName === 'status').map(x=>x.value),
      queryStatus: dataSource.filters.filter(x=>x.fieldName === 'queryStatus').map(x=>x.value),
      admissionStartDate: dataSource.filters.find(x=>x.fieldName == 'admissionStartDate').value,
      admissionEndDate: dataSource.filters.find(x=>x.fieldName == 'admissionEndDate').value,
      dischargeStartDate: dataSource.filters.find(x=>x.fieldName == 'dischargeStartDate').value,
      dischargeEndDate: dataSource.filters.find(x=>x.fieldName == 'dischargeEndDate').value
    });
  }

  updateCount() {
      this.filterList.find(x => x.id === 'status').count = this.selectedStatus.length;
      this.filterList.find(x => x.id === 'queryStatus').count = this.selectedQueryStatus.length;
  }

  navigateToFilterListItem(id: string) {
    this._focus.shiftFocus();
    this.selectedId = id;
  }

  isQueryStatusChecked(val: string) {
    if (this.selectedQueryStatus !== undefined) {
      if (this.selectedQueryStatus.find((x) => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isStatusChecked(val: string) {
    if (this.selectedStatus !== undefined) {
      if (this.selectedStatus.find((x) => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  selectAll(name: string) {
    if (name === 'status') {
      this.selectedStatus = [];
      this.statusList.forEach((status) => {
        this.selectedStatus.push(status);
      });
    }
  }

  selectStatus(event: any, value: string) {
    if (event.checked === true) {
      this.selectedStatus.push(value.trim());
    }
    if (event.checked === false) {
      this.selectedStatus = this.selectedStatus.filter(
        (x) => x !== value.trim()
      );
    }
  }

  selectQueryStatus(event: any, value: string) {
    if (event.checked === true) {
      this.selectedQueryStatus.push(value.trim());
    }
    if (event.checked === false) {
      this.selectedQueryStatus = this.selectedQueryStatus.filter(
        (x) => x !== value.trim()
      );
    }
  }

  reset(name: string) {
    if (name === 'status') {
      this.selectedStatus = [];
    }
    if (name === 'queryStatus') {
      this.selectedQueryStatus = [];
    }
  }

  unselect(name: string) {
    if (name === 'status') {
      this.selectedStatus = [];
    }
    if (name === 'queryStatus') {
      this.selectedQueryStatus = [];
    }
  }

  dateChange(propName: string, $event) {
    this.filterFormGroup.controls[propName].setValue($event.value);
  }

  resetAllFilters() {
    this.filterFormGroup.patchValue({
      status: '',
      queryStatus: '',
      admissionStartDate: '',
      admissionEndDate: '',
      dischargeStartDate: '',
      dischargeEndDate: '',
    });
    this.unselect('status');
    this.unselect('queryStatus');
  }

  primaryAction() {
    const filters: Filter[] = [];
    if (this.selectedStatus && this.selectedStatus.length > 0) {
      this.selectedStatus.forEach((ele) =>{
        filters.push({
          fieldName: 'Filters.Status',
          value: ele,
          operator: 'eq',
          type: 'dropdown',
          displayName: 'Status'
        });
      })
    }
    if (this.selectedQueryStatus && this.selectedQueryStatus.length > 0) {
      this.selectedQueryStatus.forEach((ele) => {
        filters.push({
          fieldName: 'Filters.QueryStatus',
          value: ele,
          operator: 'eq',
          type: 'dropdown',
          displayName: 'Query Status'
        });
      });
    }
    const fieldsMapping = [
      {
        controlName: 'admissionStartDate',
        filterName: 'Filters.AdmissionStartDate'
      },
      {
        controlName: 'admissionEndDate',
        filterName: 'Filters.AdmissionEndDate'
      },
      {
        controlName: 'dischargeStartDate',
        filterName: 'Filters.DischargeStartDate'
      },
      {
        controlName: 'dischargeEndDate',
        filterName: 'Filters.DischargeEndDate'
      },
    ]
    fieldsMapping.forEach(prop => {
      const fieldValue = this.filterFormGroup.controls[prop.controlName].value;
      if (fieldValue) {
        filters.push({
          fieldName: prop.controlName,
          value: fieldValue,
          operator: 'eq',
          type: 'dropdown',
          displayName: prop.controlName
        });
      }

    });
    this.dataSourceFacade.updateAllDataSourceFilter(filters);
    this.gridService.setAppliedFilters(filters);
  }
  secondaryAction() {}
  panelClose() {}
}
