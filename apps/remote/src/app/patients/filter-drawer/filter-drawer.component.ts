/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { TagView, zhealthcareTag } from '@zhealthcare/plugin/tags';
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
export class FilterDrawerComponent  extends FusionFormComponent
implements FusionFormAdapter, OnInit {
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
  queryStatusList = ['Pending', 'Answered', 'Completed', 'Dropped', 'No Response'];

  constructor(public _focus: SidebarFocusHelper, private fb: FormBuilder) {
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

  primaryAction() {}
  secondaryAction() {}
  panelClose() {}
}
