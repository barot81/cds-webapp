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
import { StatusCount, UserPersona } from '@zhealthcare/fusion/models';
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
import { FacilitySandbox } from '../../services/facilities/facility.sandbox';
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
  facilitySelection = new FormControl('');

  @ViewChild('tenantNavsContainer', { read: ViewContainerRef, static: true })
  tenantNavsContainer!: any;
  facilityStatuses: StatusCount[] = [];

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
    protected _facilityInfoSandbox: FacilitySandbox,
    protected _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    protected manageuser: ManageUserService,
    private _fuseSidebarService: FuseSidebarService,
    private resolver: ComponentFactoryResolver,
    private _featureFlagService: FeatureFlagService,
    private _launchService: LaunchService,
    private _facilitySandox: FacilitySandbox
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
      _facilityInfoSandbox,
      _headerService
    );
    this.storage = new LocalStorage();
    this._unsubscribeAll = new Subject();
    this.uniqueFacilities = new BehaviorSubject<any>(null);

  }

  ngOnInit() {
    super.ngOnInit();
    this.showProgressBar();
    this._facilityInfoSandbox
      .getFacilityNames()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        this.hideProgressBar();
        const uniqueFacilitiesValue = this.getUniqueFacilitiesList(data);
        this.uniqueFacilities.next(uniqueFacilitiesValue);
        this.showTenantSelect = true;
        this.searchFacilityCtrl.valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
            const filtereduniqueFacilities = this.getUniqueFacilitiesList(
              data
            ).filter((x) =>
              x?.name
                ?.toLowerCase()
                .includes(this.searchFacilityCtrl.value?.toLowerCase())
            );
            this.uniqueFacilities.next(filtereduniqueFacilities);
          });
    });

    const existingFacility = localStorage.getItem('FacilityId');
    if(existingFacility) {
      this.searchFacilityCtrl.setValue(existingFacility);
      this.facilitySelection.setValue(existingFacility);

      this.onFacilityChange({
        name: existingFacility,
        tenantId: existingFacility
      }, {isUserInput: true});

    }
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

  // next(obj, singleTenant?: boolean) {
  //   this.programSelection(obj, singleTenant);
  // }

  // async programSelection(tenatWithOucodes, singleTenant?: boolean) {
  //   if (tenatWithOucodes) {
  //     await super.programSelection(tenatWithOucodes);
  //     if (this.oucodeWithNames.length === 1) {
  //       if (singleTenant) {
  //         const tenantAppExists$ =
  //           this._launchService.tenantAppExistSubject.asObservable();
  //         tenantAppExists$.pipe(take(2)).subscribe((tenantAppExists) => {
  //           if (tenantAppExists) {
  //             this.showProgramSelection = true;
  //           } else if (tenantAppExists == false) {
  //             this.updateStateAndRedirect(
  //               this.selectedFacilityWiseStatuses,
  //               this.oucodeWithNames[0].key
  //             );
  //             this.showProgramSelection = false;
  //           }
  //         });
  //       }
  //     } else {
  //       this.showProgramSelection = true;
  //     }
  //   } else this.oucodeWithNames = [];
  // }

  onFacilityChange(facilityId, event) {
    this.manageuser.setTenantId(facilityId);
    if (event.isUserInput) {
      this._featureFlagService.resetFeatureFlags();
      this._headerService.setCurrentFacilityName(facilityId.name);
      this.loadingPrograms = true;
      this.showProgressBar();
      this._facilitySandox
        .getStatusCounts(facilityId.name)
        .subscribe((statuses) => {
          this.facilityStatuses = [];
          this.loadingPrograms = false;
          this.showProgramSelection = true;
          this.hideProgressBar();
          this.arrangeTiles(statuses);
          this.programSelection(facilityId.name, this.facilityStatuses);
        });
    }
  }

  arrangeTiles(statusCounts: StatusCount[]) {
    const orderedTiles = [
      {
        id: 'New',
        displayName: 'New DRG',
        description: 'Number of DRG patients awaiting review and still not discharged'
      },
      {
        id: 'Pending Query',
        displayName: 'Pending Query',
        description: 'Number of DRG patients (including discharged patients) under Pending Query status'
      },
      {
        id: 'Later Review',
        displayName: 'Later Review',
        description: 'Number of DRG patients marked as Later Review by a CDS'
      },
      {
        id: 'No Query',
        displayName: 'No Query',
        description: 'Number of DRG patients marked as No Query by a CDS'
      },
      {
        id: 'Non DRG',
        displayName: 'Non DRG',
        description: 'Total number of Non DRG patients based on the census'
      }
    ];
    const totalCount = statusCounts.find((x) => x.name === 'Total')?.count
                      ?? statusCounts.reduce((sum, current) => sum + current.count, 0);
    this.facilityStatuses.push(new StatusCount('Total DRG', totalCount, 'Total count of DRG patients in the census, regardless of their query status'));

    orderedTiles.forEach((x) => {
      this.facilityStatuses.push(
        new StatusCount(x.displayName,
          statusCounts.find((y) => y.name === x.id)?.count ?? 0,
          x.description)
      );
    });
  }

  launch(item) {

    if(item.name === 'all')
      localStorage.setItem('selectedStatus','');
    this.updateStateAndRedirect(
      this.selectedFacilityWiseStatuses,
      item.name,
      UserPersona.Administrator
    );
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
