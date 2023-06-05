import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthSandbox,
  BaseComponent,
  FusionConfigService,
  MetaConstants,
  OrgFacade,
  OucodeHelper,
  RoleService,
  URLConstants,
  UserFacade,
  UserTypeService,
} from '@zhealthcare/fusion/core';
import {
  OrgUnitInformation,
  FacilityWiseStatuses,
  StatusCount,
  UserPersona,
} from '@zhealthcare/fusion/models';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import {
  FuseProgressBarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@zhealthcare/ux';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MetaSandbox } from '../../meta.sandbox';
import { BrowserStorage } from '../../models/storage.model';
import { FacilitySandbox } from '../../services/facilities/facility.sandbox';

@Component({
  selector: 'zhc-account-launch',
  template: '',
})
export class LaunchComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  searchControl = new FormControl();
  tenantWithOuCodes: any;
  $filteredTenantWithOuCodes: Observable<Array<any>>;
  flag = false;
  user = '';
  accessError = false;
  roleHash: string;
  navigationHash: string;
  adminRoleExists;
  oucodeWithNames = [];
  showProgramSelection = false;
  selectedOucode;
  orgUnitInformation: OrgUnitInformation[] = [];
  protected _unsubscribe: Subject<any>;
  tenantList: any;
  selectedFacilityWiseStatuses: FacilityWiseStatuses;
  isLoading = false;
  inProgressCount = 0;
  storage: BrowserStorage;
  selectedProgramOucode;

  constructor(
    protected userState: UserFacade,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected orgFacade: OrgFacade,
    protected metaSandbox: MetaSandbox,
    protected authSandbox: AuthSandbox,
    protected fusionNavigatoinService: FusionNavigationService,
    protected pageFacade: PageFacade,
    protected fuseProgressBarService: FuseProgressBarService,
    protected roleService: RoleService,
    protected userTypeService: UserTypeService,
    protected _fusionConfigService: FusionConfigService,
    protected _layoutService: LayoutService,
    protected _tenantInformationSandbox: FacilitySandbox,
    protected _headerService: HeaderService
  ) {
    super();
    this._unsubscribe = new Subject();
  }


  ngOnInit() {
    this.pageFacade.setPageTitle('Launch');

    this.navigateByUserType();
    this.searchControl.valueChanges.subscribe((data) => {
      this.$filteredTenantWithOuCodes =
        data.length === 0
          ? of(this.tenantWithOuCodes.slice())
          : of(this._filter(data));
    });
  }

  getUniqueFacilitiesList(payload: any) {
    const objectMap = {};
    return payload
      .filter((tenantInformation) => {
        if (objectMap[tenantInformation.tenantId]) {
          return false;
        }
        objectMap[tenantInformation.tenantId] = true;
        return true;
      })
      .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
  }

  getTenantNameFromTenantList(uniqueTenet, key) {
    const tenant = uniqueTenet.find((x) => x.tenantId === key);
    const tenantName = tenant?.name;
    return tenantName;
  }

  setFooter() {
    this._fusionConfigService.uiSettings = {
      layout: {
        navbar: {
          hidden: false,
        },
        header: {
          hidden: false,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: false,
        },
      },
    };
  }

  private navigateByUserType() {
      this.router.navigateByUrl(URLConstants.ADMIN_LAUNCH_URL);
  }

  // protected getRoleDocument(
  //   tenantId?: string,
  //   oucode?: string,
  //   isFaculty?: boolean
  // ): Observable<any> {
  //   const roleMeta = this.roleService.getItem();
  //   const HashCode = !roleMeta ? null : roleMeta.hash;
  //   const hashFlag = !roleMeta
  //     ? true
  //     : roleMeta.hash != this.roleHash
  //     ? true
  //     : false;
  //   if (hashFlag) {
  //     return this.authSandbox.role(HashCode, tenantId, oucode, isFaculty).pipe(
  //       map((response) => {
  //         if (response['isModified']) {
  //           this.roleService.setItem(response);
  //         }
  //       })
  //     );
  //   } else {
  //     return of(roleMeta);
  //   }
  // }

  programSelection(facilityId: string, statusCounts: StatusCount[]) {
    if (facilityId && statusCounts) {
      this.selectedFacilityWiseStatuses = new FacilityWiseStatuses(
        facilityId,
        statusCounts
      );
      this.oucodeWithNames = OucodeHelper.getStatusList(
        [],
        this.selectedFacilityWiseStatuses.StatusCount
      );
    } else this.oucodeWithNames = [];
  }

  getOrgUnitInformation(selectedOucode: string): void {
    // this.showProgressBar();
    // this.metaSandbox
    //   .getOrgUnitInformation(
    //     this.selectedTenant.FacilityId,
    //     this.oucodeWithNames.map((x) => x.key)
    //   )
    //   .subscribe(
    //     async (orgUnitInformation: OrgUnitInformation[]) => {
    //       this.hideProgressBar();
    //       this.orgUnitInformation = orgUnitInformation;
    //       this.orgUnitInformation.forEach(
    //         (x) => (x.isSelected = x.oucode === selectedOucode ? true : false)
    //       );
    //       this.storage.storageType.setItem(
    //         'orgUnitInformation',
    //         JSON.stringify(this.orgUnitInformation)
    //       );
    //       this._layoutService._orgTimzone$.next(
    //         this.orgUnitInformation?.find((x) => x.isSelected)?.timeZone
    //       );
    //     },
    //     (error) => {
    //       this.fuseProgressBarService.hide();
    //     }
    //   );
  }


  protected sortTenantWithOuCodesByTenantId() {
    if (this.tenantWithOuCodes && this.tenantWithOuCodes.length > 1) {
      this.tenantWithOuCodes = this.tenantWithOuCodes.sort((a, b) =>
        a.key.toLowerCase() < b.key.toLowerCase() ? -1 : 1
      );
    }
  }

  protected _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.tenantWithOuCodes.filter(
      (a) => a.key.toLowerCase().indexOf(filterValue) > -1
    );
  }

  updateStateAndRedirect(
    selectedFacility: FacilityWiseStatuses,
    selectedStatus: string,
    selectedUserType: UserPersona
  ) {
    this.showProgressBar();
    if (selectedUserType) this.userTypeService.setUserType(selectedUserType);

    const updatedStatusCount =  selectedFacility.StatusCount.map(x => {
                                    if(x.name === selectedStatus)
                                      return Object.assign({}, x, {isSelected: true})
                                    else if(x.isSelected)
                                      return Object.assign({}, x, {isSelected: false})
                                    return x;
                                });
    const updatedFacility = {
      ...selectedFacility,
      StatusCount: updatedStatusCount
    }
    this.orgFacade.SetFacilityWiseStatuses(updatedFacility);
       this.activatedRoute.queryParams.subscribe(
          (resp) => {
            this.hideProgressBar();
            this.router.navigateByUrl('/dashboard');
          },
          (error) => {
            this.fuseProgressBarService.hide();
          }
        );
}


  getTenantName(selectedTenant: FacilityWiseStatuses) {
    const tenantId = selectedTenant.FacilityId;
    this.showProgressBar();
  }


  ngOnDestroy() {
    this.fuseProgressBarService.hide();
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

  showProgressBar() {
    this.fuseProgressBarService.show();
    this.inProgressCount++;
  }

  hideProgressBar() {
    this.inProgressCount--;
    if (this.inProgressCount === 0) {
      this.fuseProgressBarService.hide();
    }
  }
}
