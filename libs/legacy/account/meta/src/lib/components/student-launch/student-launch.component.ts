import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthSandbox,
  FusionConfigService,
  Logger,
  MetaConstants,
  OrgFacade,
  OucodeHelper,
  RoleService,
  URLConstants,
  UserFacade,
  UserTypeService,
} from '@exxat/fusion/core';
import { TenantWithOuCodeTree, UserPersona } from '@exxat/fusion/models';
import { FusionNavigationService } from '@exxat/fusion/services';
import {
  FuseProgressBarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@exxat/ux';
import { of, Subject, takeUntil } from 'rxjs';
import { MetaSandbox } from '../../meta.sandbox';
import { LocalStorage } from '../../models/storage.model';
import { TenantInformationSandbox } from '../../services/tenant-information/tenant-information-snadbox';
import { LaunchComponent } from '../launch/launch.component';

@Component({
  selector: 'account-student-launch',
  template: '',
})
export class StudentLaunchComponent extends LaunchComponent
  implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;
  uniqueTenants: null;
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
    protected fusionConfigService: FusionConfigService,
    protected _layoutService: LayoutService,
    protected _tenantInformationSandbox: TenantInformationSandbox,
    protected _headerService: HeaderService
  ) {
    super(
      userState,
      router,
      activatedRoute,
      orgFacade,
      metaSandbox,
      authSandbox,
      fusionNavigatoinService,
      pageFacade,
      fuseProgressBarService,
      roleService,
      userTypeService,
      fusionConfigService,
      _layoutService,
      _tenantInformationSandbox,
      _headerService
    );
    this.storage = new LocalStorage();
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.showProgressBar();
    this._tenantInformationSandbox
      .getTenantInformationNameList()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        this.uniqueTenants = this.getUniqueTenantList(data);
        this.studentInit();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  studentInit() {
    this.metaSandbox.launch().subscribe(
      (orgCode: any) => {
        this.roleHash = orgCode.roleHash;
        this.navigationHash = orgCode.navigationHash;
        this.tenantWithOuCodes = orgCode.tenentWithOucodeAccessTrees;
        this.sortTenantWithOuCodesByTenantId();
        this.$filteredTenantWithOuCodes = of(this.tenantWithOuCodes);
        if (
          !localStorage.getItem(MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY)
        ) {
          this.hideProgressBar();
        }
        this._headerService.setCurrentTenantName(
          this.getTenantNameFromTenantList(
            this.uniqueTenants,
            orgCode.tenentWithOucodeAccessTrees[0].key
          )
        );
        this.loadRoleAndNavigation(orgCode.tenentWithOucodeAccessTrees[0]);
      },
      (error) => {
        this.hideProgressBar();
        Logger.error(
          `Launch Component => NgOnInit Method => Launch Api failure => error: ${JSON.stringify(
            error
          )} | active Route:${this.router?.url}`
        );
      }
    );
  }

  loadRoleAndNavigation(tenatWithOucodes: any) {
    this.selectedTenant = new TenantWithOuCodeTree(
      tenatWithOucodes.key,
      tenatWithOucodes.value
    );
    this.oucodeWithNames = OucodeHelper.getProgramList(
      [],
      this.selectedTenant.OucodeTree
    );
    this.updateStateAndRedirect(
      this.selectedTenant,
      this.oucodeWithNames[0].key
    );
    this.showProgramSelection = false;
    // load navigation
    this.userTypeService.setCurrentContext(
      tenatWithOucodes.key,
      this.oucodeWithNames[0].key
    );
    this.fusionNavigatoinService.registration();
  }

  async updateStateAndRedirect(
    selectedTenant: TenantWithOuCodeTree,
    selectedOuCode: string
  ) {
    this.showProgressBar();
    selectedTenant.OucodeTree = this.buildOucodeTree(
      selectedTenant.OucodeTree,
      selectedOuCode
    );
    this.userTypeService.setUserType(UserPersona.Student);
    this.orgFacade.SetTenantWithOucodes(selectedTenant);
    // Set Role Based Data in Local Storage
    this.getRoleDocument(selectedTenant.TenantId, selectedOuCode).subscribe(
      (data) => {
        this.router.navigateByUrl(URLConstants.DASHBOARD_URL);
      },
      (error) => {
        this.fuseProgressBarService.hide();
      }
    );
    this.getOrgUnitInformation(selectedOuCode);
    this.getTenantName(selectedTenant);
  }
}
