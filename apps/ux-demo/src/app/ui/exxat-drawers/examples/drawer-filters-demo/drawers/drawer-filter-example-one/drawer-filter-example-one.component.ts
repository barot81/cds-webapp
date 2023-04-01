import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FusionFormComponent } from '@exxat/fusion/components';
import { DrawerAdapter } from '@exxat/ux';
import { SidebarFocusHelper } from '../../../../../exxat-sidebar/exxat-sidebar.service';

export interface filterListItem {
  id: string;
  title: string;
  count: number;
}

@Component({
  selector: 'ryzen-drawer-filter-example-one',
  templateUrl: './drawer-filter-example-one.component.html',
})
export class DrawerFilterExampleOneComponent
  extends FusionFormComponent
  implements DrawerAdapter
{
  selectedStatus = [];
  selectedCohort = '';
  selectedDocument = [];

  selectedId: string;

  searchItem = new FormControl();

  filterList: filterListItem[] = [
    { id: 'status-filter', title: 'Status', count: 0 },
    { id: 'cohort-filter', title: 'Cohort', count: 0 },
    { id: 'document-type-filter', title: 'Document Type', count: 0 },
  ];

  settings = [
    { id: 'pending', title: 'Pending for review' },
    { id: 'inprogress', title: 'In progress' },
    { id: 'expiring', title: 'Expiring' },
    { id: 'getstarted', title: 'Get Started' },
    { id: 'approved', title: 'Approved' },
    { id: 'expired', title: 'Expired' },
  ];

  cohorts = [
    { id: '2020', title: 'Cohort 2020' },
    { id: '2021', title: 'Cohort 2021' },
    { id: '2022', title: 'Cohort 2022' },
  ];

  documents = [
    { id: 'immunization_summary', title: 'Immunization Summary' },
    { id: 'flu', title: 'Flu' },
    { id: 'physical_exam', title: 'Physical Exam' },
  ];

  constructor(public _focus: SidebarFocusHelper) {
    super();
    this.selectedId = this.filterList[0].id;
  }

  ngOnInit() {
    this.selectedStatus = [];
    this.selectedCohort = '';
    this.selectedDocument = [];
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

  navigateToFilterListItem(id: string) {
    this._focus.shiftFocus();
    this.selectedId = id;
  }

  primaryAction() {}
  secondaryAction() {}
  panelClose() {}
}
