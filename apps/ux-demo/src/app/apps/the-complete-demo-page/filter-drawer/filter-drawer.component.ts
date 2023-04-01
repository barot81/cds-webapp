/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExxatTag, TagView } from '@exxat/plugin/tags';
import { SidebarFocusHelper } from '../../../ui/exxat-sidebar/exxat-sidebar.service';

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
  tags: Array<ExxatTag> = [
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
  selectedCohort = '';
  selectedDocument = [];

  getTagTitle(tag: ExxatTag): string {
    if (tag && tag !== null) {
      return tag.name && tag.name !== null ? tag.name : tag.title;
    }
  }

  getTagColor(tag: ExxatTag): string {
    if (tag && tag !== null) {
      return tag.color && tag.color !== null ? tag.color : tag.colorCode;
    }
  }

  public tagView = TagView;

  selectedId: string;

  searchItem = new FormControl();

  filterList: filterListItem[] = [
    { id: 'status-filter', title: 'Status', count: 4 },
    { id: 'cohort-filter', title: 'Cohort', count: 3 },
    { id: 'document-type-filter', title: 'Document Type', count: 0 }
  ];

  settings: statusBadge[] = [
    { id: 'pending', title: 'Pending for review' },
    { id: 'inprogress', title: 'In progress' },
    { id: 'expiring', title: 'Expiring' },
    { id: 'getstarted', title: 'Get Started' },
    { id: 'approved', title: 'Approved' },
    { id: 'expired', title: 'Expired' }
  ];

  cohorts = [
    { id: '2020', title: 'Cohort 2020' },
    { id: '2021', title: 'Cohort 2021' },
    { id: '2022', title: 'Cohort 2022' }
  ];

  documents = [
    { id: 'immunization_summary', title: 'Immunization Summary' },
    { id: 'flu', title: 'Flu' },
    { id: 'physical_exam', title: 'Physical Exam' }
  ];

  constructor(public _focus: SidebarFocusHelper) {
    this.selectedId = this.filterList[0].id;
  }

  ngOnInit() {
    this.selectedStatus = [];
    this.selectedCohort = '';
    this.selectedDocument = [];
  }

  navigateToFilterListItem(id: string) {
    this._focus.shiftFocus();
    this.selectedId = id;
  }

  isCohortChecked(val: string) {
    if (this.selectedCohort !== undefined) {
      if (this.selectedCohort !== undefined && this.selectedCohort === val) {
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

  isDocumentChecked(val: string) {
    if (this.selectedDocument !== undefined) {
      if (this.selectedDocument.find((x) => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  selectAll(name: string) {
    if (name === 'setting') {
      this.selectedStatus = [];
      this.settings.forEach((tag) => {
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
