import { Component, OnDestroy, OnInit } from '@angular/core';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { FeatureMetadataService } from '@zhealthcare/fusion/services';
import { DataSourceFacade, Filter, FusionDataSource, Item } from '@zhealthcare/plugin/data-source';
import { DrawerAdapter, DrawerService } from '@zhealthcare/ux';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TagMaster } from '../../../models/tagmaster.model';
import { PatientService } from '../../../services/patient.service';
import { TagMasterService } from '../../../services/tagmaster.service';

export class FilterItems implements Item {
  value: string;
  viewName: string;
  viewDate: string;
}
export interface StudentGridfilterListItem {
  id: string;
  title: string;
  count: number;
}

@Component({
  selector: 'profile-landing-grid-filter-form',
  templateUrl: './student-landing-grid-filter.component.html'
})
export class StudentLandingGridFilterComponent extends FusionFormComponent
  implements OnInit, DrawerAdapter, OnDestroy {
  private readonly _unsubscribe: Subject<any>;
  sort: string;
  sortDirection: string;
  pageSize: number;
  selectedId: string;
  isResetEnabled: boolean;
  selCohort = "";
  selTags = [];
  selGroupName = [];
  selStatus = [];
  selCampus = [];
  selCategory = [];
  selEnrollmentTerm = [];
  selGraduationTerm = [];
  selInvitationStatus = [];

  cohorts: Item[] = [];
  groups: Item[] = [];
  statuses: Item[] = [];
  campuses: Item[] = [];
  categories: Item[] = [];
  enrollmentTerms: FilterItems[] = [];
  graduationTerms: FilterItems[] = [];
  tags: Item[] = [];
  invitationStatuses: Item[] = [];
  cohort: string;
  tag: string;
  group: string;
  status: string;
  campus: string
  category: string
  enrollmentTerm: string
  graduationTerm: string
  invitationSatus: string;
  viewName = 'viewName';
  viewDate = 'viewDate';


  public tagMaster: TagMaster[];

  filterList: StudentGridfilterListItem[] = [
    { id: 'status', title: 'Status', count: 0 },
    { id: 'cohort', title: 'Cohort', count: 0 },
    { id: 'groupName', title: 'Group', count: 0 },
    { id: 'enrollmentTerm', title: 'Enrollment calendar', count: 0 },
    { id: 'graduationTerm', title: 'Graduation calendar', count: 0 },
    { id: 'category', title: 'Student Category', count: 0 },
    { id: 'campus', title: 'Campus', count: 0 },
    { id: 'tags', title: 'Tags', count: 0 }
  ];


  constructor(
    private readonly dataSourceFacade: DataSourceFacade,
    public drawerService: DrawerService,
    public _profileApiClient: PatientService,
    private readonly _tagMasterFacade: TagMasterService,
    private readonly featureService: FeatureMetadataService,
  ) {
    super();
    this._unsubscribe = new Subject();
    this.tagMaster = new Array<TagMaster>();
    // this._lookupSandbox.campusLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(campus => {
    //   const campusRes: Item[] = [];
    //   campus?.campuses?.forEach(campus => campusRes.push({ value: campus.id, viewName: campus.name }));
    //   this.campuses = campusRes;
    //   this.sortByAlphabeticalOrder(this.campuses, this.viewName);
    // });
    // this._lookupSandbox.categoryLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(category => {
    //   const categoryRes: Item[] = [];
    //   category?.categories?.forEach(campus => categoryRes.push({ value: campus.id, viewName: campus.name }));
    //   this.categories = categoryRes;
    //   this.sortByAlphabeticalOrder(this.categories, this.viewName);
    // });
    // this._lookupSandbox.enrollmentTermLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(enroll => {
    //   const enrollRes: FilterItems[] = [];
    //   enroll?.enrollmentTerms?.forEach(campus => enrollRes.push({ value: campus.id, viewName: campus.name, viewDate: campus.termDate }));
    //   this.enrollmentTerms = enrollRes;
    //   this.sortByDate(this.enrollmentTerms, this.viewDate );
    //   this.sortByAlphabeticalOrder(this.enrollmentTerms, this.viewName);
    // });
    // this._lookupSandbox.graduationTermLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(grad => {
    //   const gradRes: FilterItems[] = [];
    //   grad?.graduationTerms?.forEach(campus => gradRes.push({ value: campus.id, viewName: campus.name, viewDate: campus.termDate }));
    //   this.graduationTerms = gradRes;
    //   this.sortByDate(this.graduationTerms, this.viewDate);
    //   this.sortByAlphabeticalOrder(this.graduationTerms, this.viewName);
    // });
    // this._cohortFacade.allCohort$.pipe(takeUntil(this._unsubscribe)).subscribe(cohortList => {
    //   const cohortRes: Item[] = [];
    //   const groupRes: Item[] = [];
    //   cohortList.forEach(cohort => {
    //       if (cohort?.group)
    //         cohort?.group.forEach(group => {
    //           groupRes.push({ value: group, viewName: group })
    //         })
    //       cohortRes.push({ value: cohort.id, viewName: cohort.cohortName })
    //     }
    //   );
    //   this.groups = groupRes.reduce((unique, o) => {
    //     if (!unique.some((obj) => obj.value === o.value)) {
    //       unique.push(o);
    //     }
    //     return unique;
    //   }, []);
    //   this.sortByAlphabeticalOrder(this.groups, this.viewName);
    //   this.cohorts = cohortRes;
    //   this.sortByAlphabeticalOrder(this.cohorts, this.viewName);
    // })

    this._tagMasterFacade.allTagMaster$.pipe(takeUntil(this._unsubscribe)).subscribe(response => {
        if (response) {
          const tagRes: Item[] = [];
          this.tagMaster = response;
          response.forEach(tag => tagRes.push({ value: tag.id, viewName: tag.title }));
          this.tags = tagRes;
          this.sortByAlphabeticalOrder(this.tags, this.viewName);
        }
      }
    )

    this.featureService.getLookupByName('profilestatus').subscribe(res => {
      const statusRes: Item[] = [];
      res.items.forEach(status => statusRes.push({ value: status.itemId, viewName: status.itemId }));
      this.statuses = statusRes;
    })

    this.featureService.getLookupByName('invitationstatus').subscribe(res => {
      const invitationStatusRes: Item[] = [];
      res.items.forEach(status => invitationStatusRes.push({ value: status.itemId, viewName: status.description }));
      this.invitationStatuses = invitationStatusRes;
    })
  }



  ngOnInit() {
    if(this?.data?.studentInvitation){
      this.filterList.push({ id: 'invitationStatus', title: 'Account Status', count: 0 });
    }
    this.selectedId = this.filterList[0].id;
    this.dataSourceFacade.fusionDataSource$.pipe(takeUntil(this._unsubscribe)).subscribe(x => {
      this.selCohort = '';
      this.selTags = [];
      if (x !== undefined && x !== null && x.filters?.length > 0) {
        this.setFilterValue(x);
      }
      this.updateCount();
    });
    this.updateCount();
    this.drawerService.setPrimaryActionState(false, false);
  }

  setFilterValue(dataSource: FusionDataSource) {
    dataSource.filters.forEach(filter => {
      if (filter.value !== undefined && filter.value.trim() !== '') {
        if (filter.fieldName === 'cohortId') {
          this.selCohort = filter.value;
          this.cohort = filter.value;
        }
        if (filter.fieldName === 'groupName') {
          this.selGroupName = filter.value.trim().split('~');
          this.group = filter.value;
        }
        if (filter.fieldName === 'profileStatus') {
          this.selStatus = filter.value.trim().split('~');
          this.status = filter.value;
        }
        if (filter.fieldName === 'campusId') {
          this.selCampus = filter.value.trim().split('~');
          this.campus = filter.value;
        }
        if (filter.fieldName === 'categoryId') {
          this.selCategory = filter.value.trim().split('~');
          this.category = filter.value;
        }
        if (filter.fieldName === 'enrollmentTermId') {
          this.selEnrollmentTerm = filter.value.trim().split('~');
          this.enrollmentTerm = filter.value;
        }
        if (filter.fieldName === 'graduationTermId') {
          this.selGraduationTerm = filter.value.trim().split('~');
          this.graduationTerm = filter.value;
        }
        if (filter.fieldName === 'tagId') {
          this.selTags = filter.value.trim().split('~');
          this.tag = filter.value;
        }
        if (filter.fieldName === 'invitationStatus' && this.data?.studentInvitation) {
          this.selInvitationStatus = filter.value.trim().split('~');
          this.invitationSatus = filter.value;
        }
      }
    });
  }

  updateCount() {
    if (this.selCohort === '') {
      this.filterList.find(x => x.id === 'cohort').count = 0;
    }
    else {
      this.filterList.find(x => x.id === 'cohort').count = 1;
    }
    this.filterList.find(x => x.id === 'groupName').count = this.selGroupName.length;
    this.filterList.find(x => x.id === 'status').count = this.selStatus.length;
    this.filterList.find(x => x.id === 'campus').count = this.selCampus.length;
    this.filterList.find(x => x.id === 'category').count = this.selCategory.length;
    this.filterList.find(x => x.id === 'enrollmentTerm').count = this.selEnrollmentTerm.length;
    this.filterList.find(x => x.id === 'graduationTerm').count = this.selGraduationTerm.length;
    this.filterList.find(x => x.id === 'tags').count = this.selTags?.length;
    if(this.data?.studentInvitation){
      this.filterList.find(x => x.id === 'invitationStatus').count = this.selInvitationStatus?.length;
    }
    this.isResetEnabled = this.filterList.some((x) => x.count > 0)
  }

  isSelectAllOpt(name: string) {
    if (name === 'groupName') {
      this.selGroupName = [];
      this.groups.forEach(grp => {
        this.selGroupName.push(grp.viewName)
      })
    }
    if (name === 'status') {
      this.selStatus = [];
      this.statuses.forEach(status => {
        this.selStatus.push(status.viewName)
      })
    }
    if (name === 'campus') {
      this.selCampus = [];
      this.campuses.forEach(status => {
        this.selCampus.push(status.value)
      })
    }
    if (name === 'category') {
      this.selCategory = [];
      this.categories.forEach(status => {
        this.selCategory.push(status.value)
      })
    }
    if (name === 'enrollmentTerm') {
      this.selEnrollmentTerm = [];
      this.enrollmentTerms.forEach(status => {
        this.selEnrollmentTerm.push(status.value)
      })
    }
    if (name === 'graduationTerm') {
      this.selGraduationTerm = [];
      this.graduationTerms.forEach(status => {
        this.selGraduationTerm.push(status.value)
      })
    }
    if (name === 'tags') {
      this.selTags = [];
      this.tags.forEach(tag => {
        this.selTags.push(tag.value)
      })
    }
    if (name === 'invitationStatus') {
      this.selInvitationStatus = [];
      this.invitationStatuses.forEach(status => {
        this.selInvitationStatus.push(status.value)
      })
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  isCheckedCohort(val: string) {
    if (this.selCohort !== undefined) {
      if (this.selCohort !== undefined && this.selCohort === val) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  navigateToFilterListItem(id: string) {
    this.selectedId = id;
  }

  createFilter(filter: Filter) {
    return filter;
  }

  setCohorts(cohort: string) {
    if (cohort !== undefined) {
      this.selCohort = cohort;
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setGroup(event: any, value: string) {
    if (event.checked === true) {
      this.selGroupName.push(value.trim());
    }
    if (event.checked === false) {
      this.selGroupName = this.selGroupName.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setStatus(event: any, value: string) {
    if (event.checked === true) {
      this.selStatus.push(value.trim());
    }
    if (event.checked === false) {
      this.selStatus = this.selStatus.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setCampus(event: any, value: string) {
    if (event.checked === true) {
      this.selCampus.push(value.trim());
    }
    if (event.checked === false) {
      this.selCampus = this.selCampus.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }
  setCategory(event: any, value: string) {
    if (event.checked === true) {
      this.selCategory.push(value.trim());
    }
    if (event.checked === false) {
      this.selCategory = this.selCategory.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }
  setEnrollmentTerm(event: any, value: string) {
    if (event.checked === true) {
      this.selEnrollmentTerm.push(value.trim());
    }
    if (event.checked === false) {
      this.selEnrollmentTerm = this.selEnrollmentTerm.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }
  setGraduationTerm(event: any, value: string) {
    if (event.checked === true) {
      this.selGraduationTerm.push(value.trim());
    }
    if (event.checked === false) {
      this.selGraduationTerm = this.selGraduationTerm.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setInvitationStatus(event: any, value: string) {
    if (event.checked === true) {
      this.selInvitationStatus.push(value.trim());
    }
    if (event.checked === false) {
      this.selInvitationStatus = this.selInvitationStatus.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }


  reset() {
    this.selCohort = '';
    this.selStatus = [];
    this.selGroupName = [];
    this.selCampus = [];
    this.selTags = [];
    this.selCategory = [];
    this.selEnrollmentTerm = [];
    this.selGraduationTerm = [];
    this.selInvitationStatus = [];
    this.updateCount();
    this.enablePrimaryButton();
  }

  resetFilterByName(name: string) {
    if (name === 'groupName') {
      this.selGroupName = [];
    }
    if (name === 'status') {
      this.selStatus = [];
    }
    if (name === 'campus') {
      this.selCampus = [];
    }
    if (name === 'category') {
      this.selCategory = [];
    }
    if (name === 'enrollmentTerm') {
      this.selEnrollmentTerm = [];
    }
    if (name === 'graduationTerm') {
      this.selGraduationTerm = [];
    }
    if (name === 'tags') {
      this.selTags = [];
    }
    if (name === 'invitationStatus') {
      this.selInvitationStatus = [];
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  enablePrimaryButton() {
    this.drawerService.setPrimaryActionState(true, false);
  }

  primaryAction() {
    const filter = [];
    let filterObj: Filter;
    if (this.selCohort !== undefined && this.selCohort !== "") {
      filterObj = this.createFilter({
        fieldName: 'cohortId',
        value: this.selCohort,
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Cohort'
      });
      filter.push(filterObj);
    }
    if (this.selGroupName !== undefined && this.selGroupName.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'groupName',
        value: this.selGroupName.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Group'
      });
      filter.push(filterObj);
    }
    if (this.selStatus !== undefined && this.selStatus.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'profileStatus',
        value: this.selStatus.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Status'
      });
      filter.push(filterObj);
    }
    if (this.selCampus !== undefined && this.selCampus.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'campusId',
        value: this.selCampus.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Campus'
      });
      filter.push(filterObj);
    }
    if (this.selGraduationTerm !== undefined && this.selGraduationTerm.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'graduationTermId',
        value: this.selGraduationTerm.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'GraduationTerm'
      });
      filter.push(filterObj);
    }
    if (this.selCategory !== undefined && this.selCategory.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'categoryId',
        value: this.selCategory.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Category'
      });
      filter.push(filterObj);
    }
    if (this.selEnrollmentTerm !== undefined && this.selEnrollmentTerm.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'enrollmentTermId',
        value: this.selEnrollmentTerm.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'EnrollmentTerm'
      });
      filter.push(filterObj);
    }
    if (this.selTags !== undefined && this.selTags.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'tagId',
        value: this.selTags.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'Tags'
      });
      filter.push(filterObj);
    }
    if (this.selInvitationStatus !== undefined && this.selInvitationStatus.length > 0) {
      filterObj = this.createFilter({
        fieldName: 'invitationStatus',
        value: this.selInvitationStatus.join('~'),
        operator: 'Equals',
        type: 'dropdown',
        displayName: 'InvitationStatus'
      });
      filter.push(filterObj);
    }
    this.dataSourceFacade.updateAllDataSourceFilter(filter);
    this._profileApiClient.onFilterChange.next(true);
  }

  isCheckedTags(val: string) {
    if (this.selTags !== undefined) {
      if (this.selTags.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedGroup(val: string) {
    if (this.selGroupName !== undefined) {
      if (this.selGroupName.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedStatus(val: string) {
    if (this.selStatus !== undefined) {
      if (this.selStatus.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  isCheckedCampus(val: string) {
    if (this.selCampus !== undefined) {
      if (this.selCampus.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  isCheckedCategory(val: string) {
    if (this.selCategory !== undefined) {
      if (this.selCategory.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  isCheckedEnrollmentTerm(val: string) {
    if (this.selEnrollmentTerm !== undefined) {
      if (this.selEnrollmentTerm.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  isCheckedGraduationTerm(val: string) {
    if (this.selGraduationTerm !== undefined) {
      if (this.selGraduationTerm.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedInvitationStatus(val: string) {
    if (this.selInvitationStatus !== undefined) {
      if (this.selInvitationStatus.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setTags(event: any, value: string) {
    if (event.checked === true) {
      this.selTags.push(value.trim());
    }
    if (event.checked === false) {
      this.selTags = this.selTags.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  getColorByTagId(id: string) {
    if (id !== undefined && id !== null && id !== '' && this.tagMaster !== undefined && this.tagMaster.length > 0) {
      return this.tagMaster.find(x => x.id === id) !== undefined
        ? this.tagMaster.find(x => x.id === id)?.colorCode
        : '';
    }
    else {
      return null;
    }
  }

  private sortByDate(value: any, key: string){
    value?.sort((a, b) => new Date(a[key]).getTime() - new Date(b[key]).getTime());
  }

  private sortByAlphabeticalOrder(value: any, key: string) {
    value?.sort(function (a, b) {
      const textA = a[key]?.toUpperCase();
      const textB = b[key]?.toUpperCase();
      return ((textA < textB) ? -1 : (textA > textB) ? 1 : 0);
    });
  }

  secondaryAction() {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

}
