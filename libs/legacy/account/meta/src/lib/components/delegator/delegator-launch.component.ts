import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MetaSandbox } from '../../meta.sandbox';

import {
  AuthSandbox,
  FusionConfigService,
  Logger,
  OrgFacade,
  OucodeHelper,
  RoleService,
  UserFacade,
  UserTypeService,
} from '@exxat/fusion/core';
import { TenantWithOuCodeTree } from '@exxat/fusion/models';
import { FusionNavigationService } from '@exxat/fusion/services';
import {
  FuseProgressBarService,
  HeaderService,
  LayoutService,
  PageFacade,
} from '@exxat/ux';
import { of, Subject, takeUntil } from 'rxjs';
import { SessionStorage } from '../../models/storage.model';
import { TenantInformationSandbox } from '../../services/tenant-information/tenant-information-snadbox';
import { LaunchComponent } from '../launch/launch.component';

@Component({
  selector: 'delegator-account-launch',
  template: '',
})
export class DelegatorLaunchComponent extends LaunchComponent
  implements OnInit, OnDestroy {
  uniqueTenants: any;
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
    this.storage = new SessionStorage();
    this._unsubscribe = new Subject();
  }

  ngOnInit() {
    this.pageFacade.setPageTitle('Launch');
    this.showProgressBar();

    this._tenantInformationSandbox
      .getTenantInformationNameList()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((data: any) => {
        this.uniqueTenants = this.getUniqueTenantList(data);
        this.delegatorInit();
      });
  }

  delegatorInit() {
    this.metaSandbox.launch().subscribe(
      (orgCode: any) => {
        this.roleHash = orgCode.roleHash;
        this.navigationHash = orgCode.navigationHash;
        this.tenantWithOuCodes = orgCode.tenentWithOucodeAccessTrees;
        this.sortTenantWithOuCodesByTenantId();
        this.$filteredTenantWithOuCodes = of(this.tenantWithOuCodes);
        if (orgCode.tenentWithOucodeAccessTrees.length === 1) {
          this._headerService.setCurrentTenantName(
            this.getTenantNameFromTenantList(
              this.uniqueTenants,
              orgCode.tenentWithOucodeAccessTrees[0].key
            )
          );
          this.next(orgCode.tenentWithOucodeAccessTrees[0]);
        } else {
          this.flag = true;
          this.tenantList = orgCode.tenentWithOucodeAccessTrees.map(
            (x) => x['key']
          );
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

  next(obj) {
    this.programSelection(obj);
  }

  async programSelection(tenatWithOucodes) {
    this.selectedTenant = new TenantWithOuCodeTree(
      tenatWithOucodes.key,
      tenatWithOucodes.value
    );
    this.oucodeWithNames = OucodeHelper.getProgramList(
      [],
      this.selectedTenant.OucodeTree
    );
    this.userTypeService.setCurrentContext(
      this.selectedTenant.TenantId,
      this.oucodeWithNames[0].key
    );
    this.fusionNavigatoinService.registration();
    this.updateStateAndRedirect(
      this.selectedTenant,
      this.oucodeWithNames[0].key
    );
    this.showProgramSelection = false;
  }

  updateStateAndRedirect(
    selectedTenant: TenantWithOuCodeTree,
    selectedOuCode: string
  ) {
    let targetUrl: string;
    this.showProgressBar();
    selectedTenant.OucodeTree = this.buildOucodeTree(
      selectedTenant.OucodeTree,
      selectedOuCode
    );
    this.orgFacade.SetTenantWithOucodes(selectedTenant);
    this.getRoleDocument(selectedTenant.TenantId, selectedOuCode).subscribe(
      (data) => {
        this.activatedRoute.queryParams.subscribe(
          (resp) => {
            this.hideProgressBar();
            targetUrl = resp.targetUrl;
            if (targetUrl) {
              this.router.navigateByUrl(targetUrl);
              Logger.trace(
                `Launch Component => updateStateAndRedirect Method => TargetUrl Exists => Selected Tenant ${selectedTenant} | Selected Oucode : ${this.selectedOucode} | active Route:${this.router?.url} | targetUrl : ${targetUrl}`
              );
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

  ngOnDestroy() {
    this.fuseProgressBarService.hide();
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
    super.ngOnDestroy();
  }
}
