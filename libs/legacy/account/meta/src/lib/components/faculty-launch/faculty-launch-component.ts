import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AppComponentApp,
  AuthSandbox,
  FusionConfigService,
  loadRemoteModuleFromDefinitions,
  Logger,
  MetaConstants,
  OrgFacade,
  OucodeHelper,
  RoleService,
  UserFacade,
  UserTypeService,
} from '@zhealthcare/fusion/core';
import { FeatureFlagService } from '@zhealthcare/fusion-feature-flag';
import { TenantWithOuCodeTree, UserPersona } from '@zhealthcare/fusion/models';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import {
  FuseProgressBarService,
  FuseSidebarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@zhealthcare/ux';
import lodash from 'lodash';
import { lastValueFrom, Observable, of, Subject, takeUntil } from 'rxjs';
import { MetaSandbox } from '../../meta.sandbox';
import { LocalStorage } from '../../models/storage.model';
import { TenantInformationSandbox } from '../../services/tenant-information/tenant-information-snadbox';
import { LaunchComponent } from '../launch/launch.component';
import { LaunchService } from '../launch/launch.service';

@Component({
  selector: 'account-faculty-launch',
  templateUrl: './faculty-launch.component.html',
  styleUrls: ['./../launch/launch.component.scss'],
})
export class FacultyLaunchComponent
  extends LaunchComponent
  implements OnInit, OnDestroy
{
  userId = 0;
  hasAdminUserType = false;
  showProgramSelectionForAdmin = false;
  showProgramSelectionForFaculty = false;
  tenantWithOuCodesFaculty: any;
  tenantWithOuCodesAdmin: any;
  manageAccountSwitchbackKey;
  oucodeWithNamesFaculty;
  oucodeWithNamesAdmin;
  selectedTenantFaculty;
  selectedTenantAdmin;
  masterTenantList = [];
  loadingPrograms = false;
  $filteredMasterTenantList: Observable<Array<any>>;
  _unsubscribeAll: Subject<any>;
  uniqueTenants: any;

  @ViewChild('tenantNavsContainer', { read: ViewContainerRef, static: true })
  tenantNavsContainer!: any;

  constructor(
    protected userState: UserFacade,
    protected route: Router,
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
    protected _headerService: HeaderService,
    protected _tenantInformationSandbox: TenantInformationSandbox,
    private _fuseSidebarService: FuseSidebarService,
    private resolver: ComponentFactoryResolver,
    private _featureFlagService: FeatureFlagService,
    private _launchService: LaunchService
  ) {
    super(
      userState,
      route,
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
        this.facultyInit();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  facultyInit() {
    this.subscribeMetaSandboxToInitTenantAndOuCodes();
    this.searchControl.valueChanges.subscribe((data) => {
      this.$filteredMasterTenantList =
        data.length === 0
          ? of(this.uniqueTenants.slice())
          : of(this.filter(data));
    });
  }

  protected filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.masterTenantList.filter(
      (a) => a.toLowerCase().indexOf(filterValue) > -1
    );
  }

  onTenantSelection(tenant, event) {
    if (event.isUserInput) {
      this._featureFlagService.resetFeatureFlags();
      this._headerService.setCurrentTenantName(tenant.name);
      this.setSelectedTenant(tenant);
      const tenantId = tenant.tenantId;
      if (this.HasEmptyAccessTrees(tenantId)) {
        this.loadingPrograms = true;
        this.metaSandbox.launchTenant(tenantId).subscribe(
          (orgCode: any) => {
            this.loadingPrograms = false;
            const indexAdmin = this.tenantWithOuCodesAdmin.findIndex(
              (x) => x.key === tenantId
            );
            if (indexAdmin >= 0)
              this.tenantWithOuCodesAdmin[indexAdmin].value =
                orgCode.tenentWithOucodeAccessTrees[0]?.value;

            const indexFaculty = this.tenantWithOuCodesFaculty.findIndex(
              (x) => x.key === tenantId
            );
            if (indexFaculty >= 0)
              this.tenantWithOuCodesFaculty[indexFaculty].value =
                orgCode.tenentWithOucodeAccessTreesFaculty[0]?.value;

            this.next(tenantId);
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
      } else this.next(tenantId);
    }
  }

  next(tenantId) {
    this.programSelection(tenantId);
  }

  HasEmptyAccessTrees(tenantId: string): boolean {
    const oucodeTreeFaculty = this.tenantWithOuCodesFaculty.find(
      (x) => x.key === tenantId
    );
    const oucodeTreeAdmin = this.tenantWithOuCodesAdmin.find(
      (x) => x.key === tenantId
    );

    if (oucodeTreeFaculty || oucodeTreeAdmin) return true;
    return false;
  }

  private subscribeMetaSandboxToInitTenantAndOuCodes() {
    this.showProgressBar();
    this.metaSandbox.launch().subscribe(
      async (orgCode: any) => {
        this.roleHash = orgCode.roleHash;
        this.navigationHash = orgCode.navigationHash;
        this.tenantWithOuCodesAdmin = orgCode.tenentWithOucodeAccessTrees;
        this.tenantWithOuCodesFaculty =
          orgCode.tenentWithOucodeAccessTreesFaculty;

        this.manageAccountSwitchbackKey = localStorage.getItem(
          MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY
        );

        if (
          this.tenantWithOuCodesAdmin == null ||
          this.tenantWithOuCodesAdmin.length === 0
        ) {
          this.hasAdminUserType = false;
        } else {
          this.hasAdminUserType = true;
          this.tenantWithOuCodesAdmin.forEach((x) =>
            this.masterTenantList.push(x.key)
          );
        }

        this.tenantWithOuCodesFaculty.forEach((x) =>
          this.masterTenantList.push(x.key)
        );
        this.masterTenantList = [...new Set(this.masterTenantList)];

        if (this.masterTenantList.length === 1) {
          //launch only tenant for program selection
          this._headerService.setCurrentTenantName(
            this.getTenantNameFromTenantList(
              this.uniqueTenants,
              this.masterTenantList[0]
            )
          );
          this.next(this.masterTenantList[0]);
          this.hideProgressBar();
        } else if (this.manageAccountSwitchbackKey) {
          this.next(localStorage.getItem('TenantId'));
        } else {
          this.$filteredMasterTenantList = of(this.uniqueTenants);
          this.hideProgressBar();
        }
      },
      (error) => {
        this.hideProgressBar();
        Logger.error(
          `Faculty Launch Component => NgOnInit Method => Launch Api failure => error: ${JSON.stringify(
            error
          )} | active Route:${this.route?.url}`
        );
      }
    );
  }

  protected sortTenantByTenantId() {
    if (this.masterTenantList && this.masterTenantList.length > 1) {
      this.masterTenantList = this.masterTenantList.sort((a, b) =>
        a.toLowerCase() < b.toLowerCase() ? -1 : 1
      );
    }
  }

  async programSelection(tenantId: string) {
    const { tenantWithOucodeAccessTrees, tenantWithOucodeAccessTreesFaculty } =
      await lastValueFrom(this._tenantInformationSandbox.programs(tenantId));
    const updatedTenantWithOucodeAccessTrees = OucodeHelper.replaceKeysDeep(
      tenantWithOucodeAccessTrees,
      {
        programName: 'caption',
      }
    );
    const updatedTenantWithOucodeAccessTreesFaculty =
      OucodeHelper.replaceKeysDeep(tenantWithOucodeAccessTreesFaculty, {
        programName: 'caption',
      });

    const oucodeTreeAdmin = lodash(updatedTenantWithOucodeAccessTrees?.value)
      .keyBy('key')
      .mergeWith(
        lodash.keyBy(
          this.tenantWithOuCodesAdmin.find((x) => x.key === tenantId)?.value,
          'key'
        ),
        OucodeHelper.customizer
      )
      .values()
      .value();
    const oucodeTreeFaculty = lodash(
      updatedTenantWithOucodeAccessTreesFaculty?.value
    )
      .keyBy('key')
      .mergeWith(
        lodash.keyBy(
          this.tenantWithOuCodesFaculty.find((x) => x.key === tenantId)?.value,
          'key'
        ),
        OucodeHelper.customizer
      )
      .values()
      .value();

    let hasAdminUserType = false;

    //ADMIN
    if (oucodeTreeAdmin == null || undefined) {
      hasAdminUserType = false;
      this.showProgramSelectionForAdmin = false;
    } else {
      hasAdminUserType = true;
      this.loadTenantnavigations();
      this.oucodeWithNamesAdmin = OucodeHelper.getProgramList(
        [],
        oucodeTreeAdmin
      );
      this.selectedTenantAdmin = new TenantWithOuCodeTree(
        tenantId,
        oucodeTreeAdmin
      );
      this.showProgramSelectionForAdmin = true;
    }

    //FACULTY
    if (oucodeTreeFaculty == null || undefined)
      this.showProgramSelectionForFaculty = false;
    else {
      this.oucodeWithNamesFaculty = OucodeHelper.getProgramList(
        [],
        oucodeTreeFaculty
      );

      this.selectedTenantFaculty = new TenantWithOuCodeTree(
        tenantId,
        oucodeTreeFaculty
      );
      if (this.oucodeWithNamesFaculty.length === 1 && !hasAdminUserType) {
        this.selectedTenant = this.selectedTenantFaculty;

        this.oucodeWithNames = this.oucodeWithNamesFaculty;
        this.updateStateAndRedirect(
          this.selectedTenant,
          this.oucodeWithNamesFaculty[0].key,
          UserPersona.FacultyPersona
        );
        this.showProgramSelectionForFaculty,
          (this.showProgramSelectionForAdmin = false);
      } else {
        this.showProgramSelectionForFaculty = true;
      }
    }
  }

  launchAdmin(item) {
    this.selectedTenant = this.selectedTenantAdmin;
    this.oucodeWithNames = this.oucodeWithNamesAdmin;
    this.updateStateAndRedirect(
      this.selectedTenant,
      item.key,
      UserPersona.Administrator
    );
  }

  launchFaculty(item) {
    this.selectedTenant = this.selectedTenantFaculty;
    this.oucodeWithNames = this.oucodeWithNamesFaculty;
    this.updateStateAndRedirect(
      this.selectedTenant,
      item.key,
      UserPersona.FacultyPersona
    );
  }

  updateStateAndRedirect(
    selectedTenant: TenantWithOuCodeTree,
    selectedOuCode: string,
    selectedUserType: UserPersona
  ) {
    super.updateStateAndRedirect(
      selectedTenant,
      selectedOuCode,
      selectedUserType
    );
  }

  loadTenantnavigations() {
    loadRemoteModuleFromDefinitions(
      'tenant-app',
      './TenantNavigationsModule',
      'TenantNavigationsModule'
    )
      .then((moduleLoaded) => {
        const tenantNavComponent =
          AppComponentApp.componentMapForApps.get(`tenant-navigations`);
        const factory =
          this.resolver.resolveComponentFactory(tenantNavComponent);
        if (this.tenantNavsContainer) this.tenantNavsContainer.clear();
        this.tenantNavsContainer.createComponent(factory);
      })
      .catch((error) => {
        this._launchService.tenantAppExistSubject.next(false);
      });
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
