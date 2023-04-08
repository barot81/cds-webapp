import { Component, OnDestroy, OnInit } from '@angular/core';
// import { CohortFacade } from '@zhealthcare/cohort/store';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { FeatureMetadataService } from '@zhealthcare/fusion/services';
import { DataSourceFacade, Filter, FusionDataSource, Item } from '@zhealthcare/plugin/data-source';
// import { FilterListItem, TagMaster } from '@zhealthcare/profile/models';
// import { LookupSandbox, ReportFilterService } from '@zhealthcare/profile/services';
// import { TagMasterFacade } from '@zhealthcare/profile/store';
// import { AttestationFacade } from '@zhealthcare/settings/store';
import { DrawerAdapter, DrawerService } from '@zhealthcare/ux';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TagMaster } from '../../../models/tagmaster.model';

export class FilterItems implements Item {
  value: string;
  viewName: string;
  viewDate: string;
}
@Component({
  selector: 'profile-grid-filters-form',
  templateUrl: './grid-filters.component.html'
})
export class ProfileGridFiltersComponent extends FusionFormComponent
  implements OnInit, DrawerAdapter, OnDestroy {
  private readonly _unsubscribe: Subject<any>;
  selectedId: string;
  isResetEnabled: boolean;
  selCohort = "";
  selStatus = [];
  selAttestationStatus = [];
  selTitle = [];
  selGroupName = [];
  selCampus = [];
  selCategory = [];
  selEnrollmentTerm = [];
  selGraduationTerm = [];
  selCommunicationMode = "";
  selFollowupOption = "";
  selInterventionStatus = "";
  selAddressType = [];

  cohorts: Item[] = [];
  groups: Item[] = [];
  statuses: Item[] = [];
  campuses: Item[] = [];
  categories: Item[] = [];
  enrollmentTerms: FilterItems[] = [];
  graduationTerms: FilterItems[] = [];
  attestations = [];
  interventionStatuses: Item[] = [];
  modeOfCommunications: Item[] = [];
  followupOptions: Item[] = [];
  addressTypes: Item[] = [];

  cohort: string;
  status: string;
  addressType: string;
  selTags = [];
  tags: Item[] = [];
  tag: string;
  group: string;
  attestationStatus: string;
  attestationTitle: string;
  campus: string
  category: string
  enrollmentTerm: string
  graduationTerm: string
  interventionStatus: string;
  modeOfCommunication: string;
  followupOption: string;
  public tagMaster: TagMaster[];
  viewName = 'viewName';
  viewDate = 'viewDate';

  attestationStatusArr = [
    'Pending',
    'Completed',
    'Overdue'
  ]

  addressTypeArr = [
    { value: "Current address", viewName: "Current address" },
    { value: "Permanent address", viewName: "Permanent address" }
  ]

  filterList: FilterListItem[];

  constructor(
    private readonly dataSourceFacade: DataSourceFacade,
    public drawerService: DrawerService,
    public _reportFilterService: ReportFilterService,
    private readonly _tagMasterFacade: TagMasterFacade,
    private readonly _lookupSandbox: LookupSandbox,
    private readonly featureService: FeatureMetadataService,
  ) {
    super();
    this._unsubscribe = new Subject();
    this.tagMaster = new Array<TagMaster>();
    this.filterList = new Array<FilterListItem>();
    this._cohortFacade.allCohort$.pipe(takeUntil(this._unsubscribe)).subscribe(cohortList => {
      const cohortRes: Item[] = [];
      const groupRes: Item[] = [];
      cohortList.forEach(cohort => {
        if (cohort?.group)
          cohort?.group.forEach(group => {
            groupRes.push({ value: group, viewName: group })
          })
        cohortRes.push({ value: cohort.id, viewName: cohort.cohortName })
      }
      );
      this.groups = groupRes.reduce((unique, o) => {
        if (!unique.some((obj) => obj.value === o.value)) {
          unique.push(o);
        }
        return unique;
      }, []);
      this.sortByAlphabeticalOrder(this.groups, this.viewName);
      this.cohorts = cohortRes;
      this.sortByAlphabeticalOrder(this.cohorts, this.viewName);
    })

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

    this._lookupSandbox.campusLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(campus => {
      const campusRes: Item[] = [];
      campus?.campuses?.forEach(campus => campusRes.push({ value: campus.id, viewName: campus.name }));
      this.campuses = campusRes;
      this.sortByAlphabeticalOrder(this.campuses, this.viewName);
    });
    this._lookupSandbox.categoryLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(category => {
      const categoryRes: Item[] = [];
      category?.categories?.forEach(campus => categoryRes.push({ value: campus.id, viewName: campus.name }));
      this.categories = categoryRes;
      this.sortByAlphabeticalOrder(this.categories, this.viewName);
    });
    this._lookupSandbox.enrollmentTermLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(enroll => {
      const enrollRes: FilterItems[] = [];
      enroll?.enrollmentTerms?.forEach(campus => enrollRes.push({ value: campus.id, viewName: campus.name, viewDate: campus.termDate }));
      this.enrollmentTerms = enrollRes;
      this.sortByDate(this.enrollmentTerms, this.viewDate);
      this.sortByAlphabeticalOrder(this.enrollmentTerms, this.viewName);
    });
    this._lookupSandbox.graduationTermLookup$.pipe(takeUntil(this._unsubscribe)).subscribe(grad => {
      const gradRes: FilterItems[] = [];
      grad?.graduationTerms?.forEach(campus => gradRes.push({ value: campus.id, viewName: campus.name, viewDate: campus.termDate }));
      this.graduationTerms = gradRes;
      this.sortByDate(this.graduationTerms, this.viewDate);
      this.sortByAlphabeticalOrder(this.graduationTerms, this.viewName);
    });

    this.featureService.getLookupByName('profilestatus').subscribe(res => {
      const statusRes: Item[] = [];
      res.items.forEach(status => statusRes.push({ value: status.itemId, viewName: status.itemId }));
      this.statuses = statusRes;
    })
  }

  ngOnInit() {
    this.filterList = this.data;
    this.selectedId = this.filterList[0].id;
    if (this.filterList?.some((element) => element.title?.toLowerCase()?.includes('attestation'))) {
      this.getAttestations();
    }
    if (this.filterList?.some((element) => element.title?.toLowerCase()?.includes('communication'))) {
      this.getCommunicationModeOptions();
    }
    this.dataSourceFacade.fusionDataSource$.pipe(takeUntil(this._unsubscribe)).subscribe(x => {
      this.selCohort = '';
      this.selStatus = [];
      this.selCommunicationMode = '';
      this.selFollowupOption = '';
      this.selAttestationStatus = [];
      this.selTitle = [];
      this.selTags = [];
      this.selAddressType = [];
      this.selGroupName = [];
      this.selCampus = [];
      this.selCategory = [];
      this.selEnrollmentTerm = [];
      this.selGraduationTerm = [];
      this.interventionStatus = '';
      if (x !== undefined && x !== null && x.filters.length > 0) {
        this.setFilterValue(x);
      }
      this.updateCount();
    });
    this.updateCount();
    this.drawerService.setPrimaryActionState(false, false);
  }

  getAttestations() {
    this._attestationFacade.attestation$.pipe(takeUntil(this._unsubscribe)).subscribe(response => {
      this.attestations = response?.filter(x => x?.applicableAt === 'Student Profile')
    });
    this.sortByAlphabeticalOrder(this.attestations, 'title');
  }

  getCommunicationModeOptions() {
    this.featureService.getLookupByName('communicationmode').subscribe(res => {
      const modeOfcommunicationRes: Item[] = [];
      res.items.forEach(status => modeOfcommunicationRes.push({ value: status.itemId, viewName: status.itemId }));
      this.modeOfCommunications = modeOfcommunicationRes;
    })

    this.featureService.getLookupByName('followupfilteroptions').subscribe(res => {
      const followupoptionRes: Item[] = [];
      res.items.forEach(status => followupoptionRes.push({ value: status.itemId, viewName: status.itemId }));
      this.followupOptions = followupoptionRes;
    })

    const interventionStatus: Item[] = [];
    interventionStatus.push({ value: "Open", viewName: "Open" })
    interventionStatus.push({ value: "Closed", viewName: "Closed" })
    this.interventionStatuses = interventionStatus;
  }

  setFilterValue(dataSource: FusionDataSource) {
    dataSource.filters.forEach(filter => {
      if (filter.value !== undefined && filter.value.trim() !== '') {
        if (filter.fieldName === 'cohortId') {
          this.selCohort = filter.value;
          this.cohort = filter.value;
        }
        if (filter.fieldName === 'profileStatus') {
          this.selStatus = filter.value.trim().split('~');
          this.status = filter.value;
        }
        if (filter.fieldName === 'groupName') {
          this.selGroupName = filter.value.trim().split('~');
          this.group = filter.value;
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
        if (filter.fieldName === 'attestationStatus') {
          this.selAttestationStatus = filter.value.trim().split('~');
          this.attestationStatus = filter.value;
        }
        if (filter.fieldName === 'attestationId') {
          this.selTitle = filter.value.trim().split('~');
          this.attestationTitle = filter.value;
        }
        if (filter.fieldName === 'modeOfCommunication') {
          this.selCommunicationMode = filter.value;
          this.modeOfCommunication = filter.value;
        }
        if (filter.fieldName === 'followUpStatus') {
          this.selFollowupOption = filter.value;
          this.followupOption = filter.value;
        }
        if (filter.fieldName === 'status') {
          this.selInterventionStatus = filter.value;
          this.interventionStatus = filter.value;
        }
        if (filter.fieldName === 'addressType') {
          this.selAddressType = filter.value.trim().split('~');
          this.addressType = filter.value;
        }
      }
    });
  }

  updateCount() {
    if (this.filterList.find(x => x.id === 'cohort')) {
      this.updateSingleSelectCount(this.selCohort, 'cohort');
    }
    if (this.filterList.find(x => x.id === 'status')) {
      this.filterList.find(x => x.id === 'status').count = this.selStatus.length;
    }
    if (this.filterList.find(x => x.id === 'tags')) {
      this.filterList.find(x => x.id === 'tags').count = this.selTags.length;
    }
    if (this.filterList.find(x => x.id === 'title')) {
      this.filterList.find(x => x.id === 'title').count = this.selTitle.length;
    }
    if (this.filterList.find(x => x.id === 'attestationStatus')) {
      this.filterList.find(x => x.id === 'attestationStatus').count = this.selAttestationStatus.length;
    }
    if (this.filterList.find(x => x.id === 'modeOfCommunication')) {
      this.updateSingleSelectCount(this.selCommunicationMode, 'modeOfCommunication');
    }
    if (this.filterList.find(x => x.id === 'followUpStatus')) {
      this.updateSingleSelectCount(this.selFollowupOption, 'followUpStatus');
    }
    if (this.filterList.find(x => x.id === 'interventionStatus')) {
      this.updateSingleSelectCount(this.selInterventionStatus, 'interventionStatus');
    }
    if (this.filterList.find(x => x.id === 'groupName')) {
      this.filterList.find(x => x.id === 'groupName').count = this.selGroupName.length;
    }
    if (this.filterList.find(x => x.id === 'campus')) {
      this.filterList.find(x => x.id === 'campus').count = this.selCampus.length;
    }
    if (this.filterList.find(x => x.id === 'category')) {
      this.filterList.find(x => x.id === 'category').count = this.selCategory.length;
    }
    if (this.filterList.find(x => x.id === 'enrollmentTerm')) {
      this.filterList.find(x => x.id === 'enrollmentTerm').count = this.selEnrollmentTerm.length;
    }
    if (this.filterList.find(x => x.id === 'graduationTerm')) {
      this.filterList.find(x => x.id === 'graduationTerm').count = this.selGraduationTerm.length;
    }
    if (this.filterList.find(x => x.id === 'addressType')) {
      this.filterList.find(x => x.id === 'addressType').count = this.selAddressType.length;
    }
    this.isResetEnabled = this.filterList.some((x) => x.count > 0)
  }

  updateSingleSelectCount(selectedValue, id) {
    if (selectedValue === ('' || null || undefined) || selectedValue?.length === 0) {
      this.filterList.find(x => x.id === id).count = 0;
    }
    else {
      this.filterList.find(x => x.id === id).count = 1;
    }
  }

  isSelectAllOpt(name: string) {
    if (name === 'status') {
      this.selStatus = [];
      this.statuses.forEach(status => {
        this.selStatus.push(status.viewName)
      })
    }
    if (name === 'groupName') {
      this.selGroupName = [];
      this.groups.forEach(grp => {
        this.selGroupName.push(grp.viewName)
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
    if (name === 'title') {
      this.selTitle = [];
      this.attestations.forEach(attest => {
        this.selTitle.push(attest.id)
      })
    }
    if (name === 'attestationStatus') {
      this.selAttestationStatus = [];
      this.attestationStatusArr.forEach(res => {
        this.selAttestationStatus.push(res)
      })
    }
    if (name === 'addressType') {
      this.selAddressType = [];
      this.addressTypeArr.forEach(res => {
        this.selAddressType.push(res.value)
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

  isCheckedTitle(val: string) {
    if (this.selTitle !== undefined) {
      if (this.selTitle.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedAttestationStatus(val: string) {
    if (this.selAttestationStatus !== undefined) {
      if (this.selAttestationStatus.find(x => x === val) !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedCommunicationMode(val: string) {
    if (this.selCommunicationMode !== undefined) {
      if (this.selCommunicationMode !== undefined && this.selCommunicationMode === val) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedFollowupOptions(val: string) {
    if (this.selFollowupOption !== undefined) {
      if (this.selFollowupOption !== undefined && this.selFollowupOption === val) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedInterventionStatusOptions(val: string) {
    if (this.selInterventionStatus !== undefined) {
      if (this.selInterventionStatus !== undefined && this.selInterventionStatus === val) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isCheckedAddressTypes(val: string) {
    if (this.selAddressType !== undefined) {
      if (this.selAddressType.find(x => x === val) !== undefined) {
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

  createFilter(fieldName: string, value: any, operator: string, displayName: string, type: 'dropdown' | 'search') : Filter{
    return {
      displayName: displayName,
      fieldName: fieldName,
      operator: operator,
      value: value,
      type: type
    };
  }

  setCohorts(cohort: string) {
    if (cohort !== undefined) {
      this.selCohort = cohort;
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

  setTitle(event: any, value: string) {
    if (event.checked === true) {
      this.selTitle.push(value.trim());
    }
    if (event.checked === false) {
      this.selTitle = this.selTitle.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setAttestationStatus(event: any, value: string) {
    if (event.checked === true) {
      this.selAttestationStatus.push(value.trim());
    }
    if (event.checked === false) {
      this.selAttestationStatus = this.selAttestationStatus.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setCommunicationMode(mode: string) {
    if (mode !== undefined) {
      this.selCommunicationMode = mode;
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setFollowUpOption(mode: string) {
    if (mode !== undefined) {
      this.selFollowupOption = mode;
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setInterventionStatusOption(mode: string) {
    if (mode !== undefined) {
      this.selInterventionStatus = mode;
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  setAddressTypeOption(event: any, value: string) {
    if (event.checked === true) {
      this.selAddressType.push(value.trim());
    }
    if (event.checked === false) {
      this.selAddressType = this.selAddressType.filter(x => x !== value.trim());
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  reset() {
    this.selCohort = '';
    this.selStatus = [];
    this.selTags = [];
    this.selTitle = [];
    this.selAttestationStatus = [];
    this.selCommunicationMode = '';
    this.selFollowupOption = '';
    this.selInterventionStatus = '';
    this.selAddressType = [];
    this.selGroupName = [];
    this.selCampus = [];
    this.selCategory = [];
    this.selEnrollmentTerm = [];
    this.selGraduationTerm = [];
    this.updateCount();
    this.enablePrimaryButton();
  }

  resetFilterByName(name: string) {
    if (name === 'status') {
      this.selStatus = [];
    }
    if (name === 'groupName') {
      this.selGroupName = [];
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
    if (name === 'title') {
      this.selTitle = [];
    }
    if (name === 'attestationStatus') {
      this.selAttestationStatus = [];
    }
    if (name === 'addressType') {
      this.selAddressType = [];
    }
    this.updateCount();
    this.enablePrimaryButton();
  }

  enablePrimaryButton() {
    this.drawerService.setPrimaryActionState(true, false);
  }

  primaryAction() {
    let filter = [];
    let filterObj: Filter;
    filter= this.createCohortFilter(filter, filterObj);
    filter= this.createStatusFilter(filter, filterObj);
    filter= this.createGroupFilter(filter, filterObj);
    filter= this.createCampusFilter(filter, filterObj);
    filter= this.createGraduationFilter(filter, filterObj);
    filter= this.createCategoryFilter(filter, filterObj);
    filter= this.createEnrollmentFilter(filter, filterObj);
    filter= this.createTagsFilter(filter, filterObj);
    filter= this.createTitleFilter(filter, filterObj);
    filter= this.createAttestaionStatusFilter(filter, filterObj);
    filter= this.createCommunicationFilter(filter,filterObj);
    filter= this.createFollowUPFilter(filter, filterObj);
    filter= this.createInterventionStatusFilter(filter,filterObj);
    filter= this.createAddressTypeFilter(filter, filterObj);
    if (this.key !== 'race-gender-age-ethnicity') {
      this.dataSourceFacade.updateAllDataSourceFilter(filter);
    } else {
      this.updateAllDataSourceFilter(filter);
    }
    this._reportFilterService.onFilterChange.next(true);
    this._reportFilterService.onCohortSelect.next(this.selCohort);
  }

  createCohortFilter(filters, filterObj:Filter)
  {
    if (this.selCohort !== '') {
      filterObj = this.createFilter('cohortId', this.selCohort, 'Equals', 'Cohort', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createStatusFilter(filters, filterObj:Filter)
  {
    if (this.selStatus.length > 0) {
      filterObj = this.createFilter('profileStatus', this.selStatus.join('~'), 'Equals', 'Status', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createGroupFilter(filters, filterObj:Filter)
  {
    if (this.selGroupName.length > 0) {
      filterObj = this.createFilter('groupName', this.selGroupName.join('~'), 'Equals', 'Group', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createCampusFilter(filters, filterObj:Filter)
  {
    if (this.selCampus.length > 0) {
      filterObj = this.createFilter('campusId', this.selCampus.join('~'), 'Equals', 'Campus', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createGraduationFilter(filters, filterObj:Filter)
  {
    if (this.selGraduationTerm.length > 0) {
      filterObj = this.createFilter('graduationTermId', this.selGraduationTerm.join('~'), 'Equals', 'GraduationTerm', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createCategoryFilter(filters, filterObj:Filter)
  {
    if (this.selCategory.length > 0) {
      filterObj = this.createFilter('categoryId', this.selCategory.join('~'), 'Equals', 'Category', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createEnrollmentFilter(filters, filterObj:Filter)
  {
    if (this.selEnrollmentTerm.length > 0) {
      filterObj = this.createFilter('enrollmentTermId', this.selEnrollmentTerm.join('~'), 'Equals', 'EnrollmentTerm', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createTagsFilter(filters, filterObj:Filter)
  {
    if (this.selTags.length > 0) {
      filterObj = this.createFilter('tagId', this.selTags.join('~'), 'Equals', 'Tags', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createTitleFilter(filters, filterObj:Filter)
  {
    if (this.selTitle.length > 0) {
      filterObj = this.createFilter('attestationId', this.selTitle.join('~'), 'Equals', 'Attestation Title', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createAttestaionStatusFilter(filters, filterObj:Filter)
  {
    if (this.selAttestationStatus.length > 0) {
      filterObj = this.createFilter('attestationStatus', this.selAttestationStatus.join('~'), 'Equals', 'Attestation Status', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createCommunicationFilter(filters, filterObj:Filter)
  {
    if (this.selCommunicationMode !== '') {
      filterObj = this.createFilter('modeOfCommunication', this.selCommunicationMode, 'Equals', 'Mode of Communication', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createFollowUPFilter(filters, filterObj:Filter)
  {
    if (this.selFollowupOption !== '') {
      filterObj = this.createFilter('followUpStatus', this.selFollowupOption, 'Equals', 'Follow Up Status', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createInterventionStatusFilter(filters, filterObj:Filter)
  {
    if (this.selInterventionStatus !== '') {
      filterObj = this.createFilter('status', this.selInterventionStatus, 'Equals', 'Intervention Status', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
  }

  createAddressTypeFilter(filters, filterObj:Filter)
  {
    if (this.selAddressType.length > 0) {
      filterObj = this.createFilter('addressType', this.selAddressType.join('~'), 'Equals', 'Address Type', 'dropdown');
      filters.push(filterObj);
    }
    return filters;
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

  updateAllDataSourceFilter(filters: Filter[]) {
    const fusionDataSource: FusionDataSource = JSON.parse(localStorage.getItem('fusionDataSource'));
    if (fusionDataSource.filters !== undefined) {
      const searchFilter = fusionDataSource.filters.filter(x => x.type === 'search');
      searchFilter.forEach(x => {
        if (x !== undefined && x !== null && x.value !== '') {
          filters.push(x);
        }
      })
    }
    fusionDataSource.filters = filters;

    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));
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
    this.filterList = [];
  }

}
