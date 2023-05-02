/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  templateUrl: './filter-drawer.component.html'
})
export class FilterDrawerComponent {
  tags: Array<zhealthcareTag> = [
    {
      id: Math.random(),
      name: 'Tag with 30 characters allowed',
      color: 'indigo-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 2 1 Tag Lorem i',
      color: 'deep-orange-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 3',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 4 Bigger Text 4',
      color: 'blue-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 5',
      color: 'gray-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 6',
      color: 'purple-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 7 Bigger Text',
      color: 'yellow-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 8 Bigger Text 8 ',
      color: 'green-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 9',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 10 Bigger Text',
      color: 'indigo-500',
      isChecked: true
    }
  ];

  selectedStatus = [];
  selectedDocument = [];
  selectedQueryStatus: [];

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
    { id: 'admit-date-filter', title: 'Admit Date', count: 0 },
    { id: 'discharge-date-filter', title: 'Discharge Date', count: 0 }
  ];

  statusList = ['New', 'Reviewed', 'Later Review', 'No Query', 'Non DRG'];
  QueryStatusList = ['Pending', 'Answered', 'Completed', 'Dropped', 'No Response'];


  constructor(public _focus: SidebarFocusHelper) {
    this.selectedId = this.filterList[0].id;
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
      this.statusList.forEach((tag) => {
        this.selectedStatus.push(tag.id);
      });
    }
    if (name === 'document') {
      this.selectedDocument = [];
      this.documents.forEach((doc) => {
        this.selectedDocument.push(doc.id);
      });
    }
  }

  selectSetting(event: any, value: string) {
    if (event.checked === true) {
      this.selectedStatus.push(value.trim());
    }
    if (event.checked === false) {
      this.selectedStatus = this.selectedStatus.filter(
        (x) => x !== value.trim()
      );
    }
  }

  selectCohort(cohort: string) {
    if (cohort !== undefined) {
      this.selectedCohort = cohort;
    }
  }

  selectDocument(event: any, value: string) {
    if (event.checked === true) {
      this.selectedDocument.push(value.trim());
    }
    if (event.checked === false) {
      this.selectedDocument = this.selectedDocument.filter(
        (x) => x !== value.trim()
      );
    }
  }

  reset(name: string) {
    if (name === 'setting') {
      this.selectedStatus = [];
    }
    if (name === 'document') {
      this.selectedDocument = [];
    }
  }

  unselect(name: string) {
    if (name === 'setting') {
      this.selectedStatus = [];
    }
    if (name === 'document') {
      this.selectedDocument = [];
    }
  }

  clearSelected() {
    this.selectedCohort = '';
  }
}
