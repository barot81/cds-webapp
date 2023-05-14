import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';
import {
  AppComponentApp,
  AuthSandbox,
  FusionConfigService,
  loadRemoteModuleFromDefinitions,
  Logger,
  MetaConstants,
  OrgFacade,
  RoleService,
  URLConstants,
  UserFacade,
  UserTypeService,
} from '@zhealthcare/fusion/core';
import { FeatureFlagService } from '@zhealthcare/fusion-feature-flag';
import { UserPersona } from '@zhealthcare/fusion/models';
import {
  FusionNavigationService,
  ManageUserService,
} from '@zhealthcare/fusion/services';
import {
  FuseProgressBarService,
  FuseSidebarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@zhealthcare/ux';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { MetaSandbox } from '../../meta.sandbox';
import { LocalStorage } from '../../models/storage.model';
import { ReleaseNotesSandbox } from '../../services/releaseNote/release-notes.sandbox';
import { TenantInformationSandbox } from '../../services/tenant-information/tenant-information-snadbox';
import { LaunchComponent } from '../launch/launch.component';
import { LaunchService } from '../launch/launch.service';

@Component({
  selector: 'zhc-admin-launch',
  templateUrl: './admin-launch.component.html',
  styleUrls: ['./../launch/launch.component.scss'],
})
export class AdminLaunchComponent
  extends LaunchComponent
  implements OnInit, OnDestroy
{
  manageAccountSwitchbackKey;
  loadingPrograms = false;
  releaseNotesThreshold = 7;
  uniqueFacilities: BehaviorSubject<any>;
  showTenantSelect = false;
  _unsubscribeAll: Subject<any>;
  searchFacilityCtrl = new FormControl();

  @ViewChild('tenantNavsContainer', { read: ViewContainerRef, static: true })
  tenantNavsContainer!: any;

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
    protected _headerService: HeaderService,
    protected _releaseNotesSandbox: ReleaseNotesSandbox,
    protected _TenantInformationSandbox: TenantInformationSandbox,
    protected _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    protected manageuser: ManageUserService,
    private _fuseSidebarService: FuseSidebarService,
    private resolver: ComponentFactoryResolver,
    private _featureFlagService: FeatureFlagService,
    private _launchService: LaunchService
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
      _TenantInformationSandbox,
      _headerService
    );
    this.storage = new LocalStorage();
    this._unsubscribeAll = new Subject();
    this.uniqueFacilities = new BehaviorSubject<any>(null);
  }

  ngOnInit() {
    super.ngOnInit();
    this.manageAccountSwitchbackKey = localStorage.getItem(
      MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY
    );
    this.showProgressBar();
    this._TenantInformationSandbox
      .getFacilityInformationNameList()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        const uniqueFacilitiesValue = this.getUniqueFacilitiesList(data);
        this.uniqueFacilities.next(uniqueFacilitiesValue);
         this.multiFacilityInit();
        this.searchFacilityCtrl.valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
            const filtereduniqueFacilities = this.getUniqueFacilitiesList(data)
                  .filter((x) => x?.name?.toLowerCase().includes(this.searchFacilityCtrl.value?.toLowerCase()));
            this.uniqueFacilities.next(filtereduniqueFacilities);
          });
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  sharedTenantInit(orgCode) {
    this.roleHash = orgCode.roleHash;
    this.navigationHash = orgCode.navigationHash;
    this.tenantWithOuCodes = orgCode.tenentWithOucodeAccessTrees;
  }

  multiFacilityInit() {
    this.showTenantSelect = true;
    this.metaSandbox.launch().subscribe(
      (orgCode: any) => {
        this.sharedTenantInit(orgCode);
        this.flag = true;
        this.tenantList = orgCode.tenentWithOucodeAccessTrees.map(
          (x) => x['key']
        );
        this.hideProgressBar();
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

  next(obj, singleTenant?: boolean) {
    this.programSelection(obj, singleTenant);
  }

  async programSelection(tenatWithOucodes, singleTenant?: boolean) {
    if (tenatWithOucodes) {
      await super.programSelection(tenatWithOucodes);
      if (this.oucodeWithNames.length === 1) {
        if (singleTenant) {
          const tenantAppExists$ =
            this._launchService.tenantAppExistSubject.asObservable();
          tenantAppExists$.pipe(take(2)).subscribe((tenantAppExists) => {
            if (tenantAppExists) {
              this.showProgramSelection = true;
            } else if (tenantAppExists == false) {
              this.updateStateAndRedirect(
                this.selectedTenant,
                this.oucodeWithNames[0].key,
                UserPersona.Administrator
              );
              this.showProgramSelection = false;
            }
          });
        }
      } else {
        this.showProgramSelection = true;
      }
    } else this.oucodeWithNames = [];
  }

  onFacilityChange(tenant, event) {
    this.manageuser.setTenantId(tenant);
    if (event.isUserInput) {
      this._featureFlagService.resetFeatureFlags();
      this._headerService.setCurrentFacilityName(tenant.name);
      this.setSelectedFacility(tenant);
      const updatedFacilityWithQuery = this.tenantWithOuCodes.find(
        (x) => x.key === tenant.tenantId
      );
      if (updatedFacilityWithQuery && !updatedFacilityWithQuery?.value) {
        this.loadingPrograms = true;
        this.metaSandbox.launchTenant(tenant.tenantId).subscribe(
          (orgCode: any) => {
            this.loadingPrograms = false;
            const selectedTenant = this.tenantWithOuCodes.find(
              (x) => x.key === tenant.tenantId
            );
            selectedTenant.value =
              orgCode.tenentWithOucodeAccessTrees[0]?.value;
            this.next(selectedTenant);
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
      } else {
        this.showProgramSelection = false;
        this.next(updatedFacilityWithQuery);
        this.showProgramSelection = true;
      }
    }
  }

  launch(item) {
    this.setSelectedOUCode(item.key);
    this.updateStateAndRedirect(
      this.selectedTenant,
      item.key,
      UserPersona.Administrator
    );
    this.manageuser.setOucode(item.key);
  }

  manageAccount(state) {
    if (state?.user?.ManagedUserAccount?.IsActive) {
      Logger.trace(
        `Launch Component => NgOnInit Method => Admin is managing student account. Redirect to dashboard  => User Info: ${JSON.stringify(
          state?.user
        )} | active Route:${this.router?.url}`
      );
      this.router.navigateByUrl(URLConstants.DASHBOARD_URL);
    }
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
