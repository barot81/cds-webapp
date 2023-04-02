import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthSandbox,
  BaseComponent,
  FusionConfigService,
  Logger,
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
  OuCodeAccessTree,
  TenantWithOuCodeTree,
  UserPersona,
} from '@zhealthcare/fusion/models';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import {
  FuseProgressBarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@zhealthcare/ux';
import lodash from 'lodash';
import { lastValueFrom, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MetaSandbox } from '../../meta.sandbox';
import { ProfileDataSource } from '../../models/datasource';
import { BrowserStorage } from '../../models/storage.model';
import { TenantInformationSandbox } from '../../services/tenant-information/tenant-information-snadbox';

@Component({
  selector: 'account-launch',
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
  selectedTenant: TenantWithOuCodeTree;
  isLoading = false;
  inProgressCount = 0;
  storage: BrowserStorage;
  selectedProgramOucode;
  oucodeTree: OuCodeAccessTree[];
  tenantWithOucodeTreeWithCaption: OuCodeAccessTree;

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
    protected _tenantInformationSandbox: TenantInformationSandbox,
    protected _headerService: HeaderService
  ) {
    super();
    this._unsubscribe = new Subject();
  }

  getselectedProgram() {
    this.orgFacade.selectedOucode$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((x) => (this.selectedProgramOucode = x.Oucode));
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

  getUniqueTenantList(payload: any) {
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
    this.setSelectedTenant(tenant);
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

  protected getRoleDocument(
    tenantId?: string,
    oucode?: string,
    isFaculty?: boolean
  ): Observable<any> {
    const roleMeta = this.roleService.getItem();
    const HashCode = !roleMeta ? null : roleMeta.hash;
    const hashFlag = !roleMeta
      ? true
      : roleMeta.hash != this.roleHash
      ? true
      : false;
    if (hashFlag) {
      return this.authSandbox.role(HashCode, tenantId, oucode, isFaculty).pipe(
        map((response) => {
          if (response['isModified']) {
            this.roleService.setItem(response);
          }
        })
      );
    } else {
      return of(roleMeta);
    }
  }

  async programSelection(tenatWithOucodes) {
    if (tenatWithOucodes) {
      this.selectedTenant = new TenantWithOuCodeTree(
        tenatWithOucodes.key,
        tenatWithOucodes.value
      );
      this.oucodeWithNames = OucodeHelper.getProgramList(
        [],
        await this.getPrograms()
      );
    } else this.oucodeWithNames = [];
  }

  getOrgUnitInformation(selectedOucode: string): void {
    this.showProgressBar();
    this.metaSandbox
      .getOrgUnitInformation(
        this.selectedTenant.TenantId,
        this.oucodeWithNames.map((x) => x.key)
      )
      .subscribe(
        async (orgUnitInformation: OrgUnitInformation[]) => {
          this.hideProgressBar();
          this.orgUnitInformation = orgUnitInformation;
          this.orgUnitInformation.forEach(
            (x) => (x.isSelected = x.oucode === selectedOucode ? true : false)
          );
          this.storage.storageType.setItem(
            'orgUnitInformation',
            JSON.stringify(this.orgUnitInformation)
          );
          this._layoutService._orgTimzone$.next(
            this.orgUnitInformation?.find((x) => x.isSelected)?.timeZone
          );
          await this.getPrograms();
          this.setSelectedOUCode(selectedOucode);
        },
        (error) => {
          this.fuseProgressBarService.hide();
        }
      );
  }

  async getPrograms() {
    const orgUnitInformation = (
      await lastValueFrom(
        this._tenantInformationSandbox.programs(this.selectedTenant.TenantId)
      )
    )?.tenantWithOucodeAccessTrees.value;
    const originalOrg = this.selectedTenant.OucodeTree;
    const updatedOrgUnitInfo = OucodeHelper.replaceKeysDeep(
      orgUnitInformation,
      {
        programName: 'caption',
      }
    );
    this.tenantWithOucodeTreeWithCaption = updatedOrgUnitInfo[0];
    this.orgFacade.SetOuCodeAccessTree(updatedOrgUnitInfo[0].Children);

    const oucodeTree = lodash(lodash.cloneDeep(updatedOrgUnitInfo))
      .keyBy('Name')
      .mergeWith(lodash.keyBy(lodash.cloneDeep(originalOrg), 'Name'), OucodeHelper.customizer)
      .values()
      .value();
    this.oucodeTree = OucodeHelper.flattenOUCodeTree(oucodeTree);
    return oucodeTree;
  }

  setSelectedOUCode(selectedOucode: string) {
    const selectedOUCode = this.oucodeTree?.find(
      (x) => x.Oucode === selectedOucode
    );
    const selectedOUCodeCaption = !!selectedOUCode?.caption
      ? selectedOUCode?.caption
      : selectedOUCode?.Name;
    this._headerService.setSelectedOUCodeCaption(selectedOUCodeCaption);
    this._headerService.setTenantWithOucodeTreeWithCaption(
      this.tenantWithOucodeTreeWithCaption
    );
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
    selectedTenant: TenantWithOuCodeTree,
    selectedOuCode: string,
    selectedUserType?: UserPersona
  ) {
    let targetUrl: string;

    if (selectedUserType) this.userTypeService.setUserType(selectedUserType);
    const isFaculty = this.userTypeService.isFacultyPersonaSelected();
    this.userTypeService.setCurrentContext(
      selectedTenant.TenantId,
      selectedOuCode
    );
    //get Navigation
    //this.fusionNavigatoinService.registration();

    this.showProgressBar();
    selectedTenant.OucodeTree = this.buildOucodeTree(
      selectedTenant.OucodeTree,
      selectedOuCode
    );
    this.orgFacade.SetTenantWithOucodes(selectedTenant);
    // Set Role Based Data in Local Storage
    this.getRoleDocument(
      selectedTenant.TenantId,
      selectedOuCode,
      isFaculty
    ).subscribe(
      (data) => {
        // from this line to 235 this code should be in child component
        this.activatedRoute.queryParams.subscribe(
          (resp) => {
            this.hideProgressBar();
            targetUrl = resp.targetUrl;
            if (targetUrl) {
              this.removeStudentSessionFilters();
              this.removeCourseSessionFilters();
              this.removeSiteSessionFilters();
              this.router.navigateByUrl(targetUrl);
              Logger.trace(
                `Launch Component => updateStateAndRedirect Method => TargetUrl Exists => Selected Tenant ${selectedTenant} | Selected Oucode : ${this.selectedOucode} | active Route:${this.router?.url} | targetUrl : ${targetUrl}`
              );
            } else if (
              localStorage.getItem(MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY)
            ) {
              localStorage.removeItem(
                MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY
              );
              const returnUrl = localStorage.getItem(
                URLConstants.MANAGE_ACCOUNT_SWITCH_BACK_URL
              );
              if (returnUrl && returnUrl != '') {
                this.router.navigateByUrl(returnUrl);
              } else {
                this.router.navigateByUrl('/dashboard');
              }
            } else {
              this.removeStudentSessionFilters();
              this.removeCourseSessionFilters();
              this.removeSiteSessionFilters();
              this.router.navigateByUrl('/dashboard');
            }
          },
          (error) => {
            this.fuseProgressBarService.hide();
          }
        );

        this.getOrgUnitInformation(selectedOuCode);
        this.getTenantName(selectedTenant);
      },
      (error) => {
        this.fuseProgressBarService.hide();
      }
    );
  }

  removeStudentSessionFilters() {
    //Clear StudentGrid filters whenever we login or change program.
    sessionStorage.removeItem(ProfileDataSource.Student_Grid_Datasource);
  }
  removeCourseSessionFilters() {
    // sessionStorage.removeItem(CourseDataSource.Course_Offering_Grid_Datasource);
    //  sessionStorage.removeItem(CourseDataSource.Course_Catlog_Grid_Datasource);
  }

  removeSiteSessionFilters() {
    sessionStorage.removeItem('Site_Grid');
    sessionStorage.removeItem('Location_Grid');
    sessionStorage.removeItem('Personnel_Grid');
    sessionStorage.removeItem('SitewithContract_Grid');
    sessionStorage.removeItem('SitewithoutContract_Grid');
    sessionStorage.removeItem('Explore_Location');
  }

  buildOucodeTree(oucodeTrees, oucode) {
    if (Array.isArray(oucodeTrees)) {
      oucodeTrees.forEach((element, index) => {
        if (oucodeTrees[index]['Oucode'] === oucode)
          oucodeTrees[index]['isSelected'] = true;
        else if (element.hasOwnProperty('Children')) {
          this.buildOucodeTree(element.Children, oucode);
          oucodeTrees[index]['isSelected'] = false;
        }
      });
    } else {
      if (oucodeTrees['Oucode'] === oucode) oucodeTrees.isSelected = true;
      else if (oucodeTrees.hasOwnProperty('Children')) {
        this.buildOucodeTree(oucodeTrees.Children, oucode);
        oucodeTrees['isSelected'] = false;
      }
    }
    return oucodeTrees;
  }

  getTenantName(selectedTenant: TenantWithOuCodeTree) {
    let tenantId = selectedTenant.TenantId;
    this.showProgressBar();
    this.metaSandbox.getOrganizationInformation('Org.' + tenantId).subscribe(
      (result) => {
        this.storage.storageType.setItem('TenantName', result.name);
        this.hideProgressBar();
      },
      (error) => {
        this.fuseProgressBarService.hide();
      }
    );
  }

  setSelectedTenant(tenant: any) {
    localStorage.setItem(MetaConstants.SELECTED_TENANT, JSON.stringify(tenant));
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
