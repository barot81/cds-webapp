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
  NavigationConstants,
} from '@zhealthcare/fusion/services';
import {
  FuseProgressBarService,
  FuseSidebarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@zhealthcare/ux';
import moment from 'moment';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { MetaSandbox } from '../../meta.sandbox';
import { LocalStorage } from '../../models/storage.model';
import { ReleaseNotesSandbox } from '../../services/releaseNote/release-notes.sandbox';
import { TenantInformationSandbox } from '../../services/tenant-information/tenant-information-snadbox';
import { LaunchComponent } from '../launch/launch.component';
import { LaunchService } from '../launch/launch.service';

@Component({
  selector: 'account-admin-launch',
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
  uniqueTenants: BehaviorSubject<any>;
  showTenantSelect = false;
  _unsubscribeAll: Subject<any>;
  searchTenantCtrl = new FormControl();

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
    this.releaseNotesThreshold =
      _runtimeConfigLoaderService.getConfig().appSettings.releaseNoteNotification.offset;
    this._unsubscribeAll = new Subject();
    this.uniqueTenants = new BehaviorSubject<any>(null);
  }

  ngOnInit() {
    super.ngOnInit();
    this.manageAccountSwitchbackKey = localStorage.getItem(
      MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY
    );
    this.showProgressBar();
    this.getReleaseNotesNotification();
    this._TenantInformationSandbox
      .getTenantInformationNameList()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        const uniqueTenantsValue = this.getUniqueTenantList(data);
        this.uniqueTenants.next(uniqueTenantsValue);
        if (uniqueTenantsValue.length <= 1) {
          this.singleTenantInit();
        } else {
          this.multiTenantInit();
        }
        this.searchTenantCtrl.valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
            const filteredUniqueTenants = this.getUniqueTenantList(data)
                  .filter((x) => x?.name?.toLowerCase().includes(this.searchTenantCtrl.value?.toLowerCase()));
            this.uniqueTenants.next(filteredUniqueTenants);
          });
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  getReleaseNotesNotification() {
    let isAdmin = false;
    let isSuperAdmin = false;
    if (!localStorage.getItem('User')) {
      return;
    }
    const userRoles = JSON.parse(localStorage.getItem('User'))?.UserRoles;
    const arr = userRoles?.filter(
      (x) => x?.RoleCode?.includes('Admin') || x?.UserType === 'Administrator'
    );
    if (arr?.length > 0) isAdmin = true;
    const superAdminRole = userRoles?.filter((x) =>
      x?.RoleCode?.includes('DevOps')
    );
    if (superAdminRole.length > 0) isSuperAdmin = true;

    if (!isAdmin) {
      return;
    }

    this._releaseNotesSandbox.GetReleaseNotesNameList().subscribe((resp) => {
      if (isSuperAdmin) {
        resp = resp.filter((x) => x.isPublished);
      }
      resp.sort((a, b) => {
        const isLater = moment(a.creationDate).isAfter(b.creationDate);
        const isEquals = moment(a.creationDate).isSame(b.creationDate);
        if (isEquals) return 0;
        if (isLater) return -1;
        else return 1;
      });
      const latestReleaseNote = resp[0];
      const lastSeenReleaseNote = localStorage.getItem('lastSeenReleaseNote');
      let showReleaseNotes = localStorage.getItem('showReleaseNotes');
      if (
        lastSeenReleaseNote !== JSON.stringify(latestReleaseNote?.creationDate)
      ) {
        showReleaseNotes = '';
      }
      const diffInDays = moment().diff(
        moment(latestReleaseNote.creationDate),
        'days'
      );
      if (diffInDays <= this.releaseNotesThreshold && !showReleaseNotes) {
        this._headerService.showReleaseNotes.next(true);
        localStorage.setItem(
          'lastSeenReleaseNote',
          JSON.stringify(latestReleaseNote?.creationDate)
        );
      }
    });
  }

  sharedTenantInit(orgCode) {
    this.roleHash = orgCode.roleHash;
    this.navigationHash = orgCode.navigationHash;
    this.tenantWithOuCodes = orgCode.tenentWithOucodeAccessTrees;
  }

  singleTenantInit() {
    this.metaSandbox.launch().subscribe(
      (orgCode: any) => {
        this.sharedTenantInit(orgCode);
        this.sortTenantWithOuCodesByTenantId();
        if (orgCode.tenentWithOucodeAccessTrees.length === 1) {
          this._headerService.setCurrentTenantName(
            this.getTenantNameFromTenantList(
              this.uniqueTenants.getValue(),
              orgCode.tenentWithOucodeAccessTrees[0].key
            )
          );
          this.loadTenantnavigations();
          this.next(orgCode.tenentWithOucodeAccessTrees[0], true);
          this.hideProgressBar();
        }
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

  multiTenantInit() {
    this.showTenantSelect = true;
    this.metaSandbox.launch().subscribe(
      (orgCode: any) => {
        this.sharedTenantInit(orgCode);
        this.sortTenantWithOuCodesByTenantId();
        if (this.manageAccountSwitchbackKey) {
          this.next(
            orgCode.tenentWithOucodeAccessTrees.find(
              (x) => x.key === localStorage.getItem('TenantId')
            )
          );
        } else {
          this.flag = true;
          this.tenantList = orgCode.tenentWithOucodeAccessTrees.map(
            (x) => x['key']
          );
          this.hideProgressBar();
        }
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
    if (this.manageAccountSwitchbackKey)
      this.checkAndRedirectIfManageAccountProgramSelection(obj);
    else this.programSelection(obj, singleTenant);
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

  onTenantChange(tenant, event) {
    this.manageuser.setTenantId(tenant);
    if (event.isUserInput) {
      this._featureFlagService.resetFeatureFlags();
      this._headerService.setCurrentTenantName(tenant.name);
      this.setSelectedTenant(tenant);
      this.loadTenantnavigations();
      const updatedTenantWithOucode = this.tenantWithOuCodes.find(
        (x) => x.key === tenant.tenantId
      );
      if (updatedTenantWithOucode && !updatedTenantWithOucode?.value) {
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
        this.next(updatedTenantWithOucode);
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

  checkAndRedirectIfManageAccountProgramSelection(tenatWithOucodes) {
    if (!tenatWithOucodes?.value) {
      this.metaSandbox.launchTenant(tenatWithOucodes.key).subscribe(
        (orgCode: any) => {
          tenatWithOucodes.value =
            orgCode.tenentWithOucodeAccessTrees[0]?.value;
          this.ManageAccountUpdateStateAndRedirect(tenatWithOucodes);
        },
        (error) => {
          Logger.error(
            `Admin Launch Component => Switch Back => LaunchTenant Api failure => error: ${JSON.stringify(
              error
            )} | active Route:${this.router?.url}`
          );
        }
      );
    } else {
      this.ManageAccountUpdateStateAndRedirect(tenatWithOucodes);
    }
  }

  ManageAccountUpdateStateAndRedirect(tenatWithOucodes) {
    super.programSelection(tenatWithOucodes);
    const switchBackOuCode = localStorage.getItem(
      MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY
    );
    if (switchBackOuCode) {
      Logger.trace(
        `Launch Component => ProgramSelection Method => Switch back to admin from manage account => Tenant With Oucode ${JSON.stringify(
          tenatWithOucodes
        )} |switch back Oucode : ${switchBackOuCode} |active Route:${
          this.router?.url
        }`
      );
      this.userTypeService.setCurrentContext(
        this.selectedTenant.TenantId,
        switchBackOuCode
      );
      this.fusionNavigatoinService.setCurrentNavigation(
        NavigationConstants.Main
      ); // set current navigation back to main BUG #76580 and #76582
      this.updateStateAndRedirect(
        this.selectedTenant,
        switchBackOuCode,
        UserPersona.Administrator
      );
      this.showProgramSelection = false;
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
