import {
  Injectable,
  ComponentFactoryResolver,
  OnDestroy,
  NgModuleRef,
  Component,
  Injector,
  Compiler,
  CompilerFactory,
  ModuleWithComponentFactories,
  ResolvedReflectiveFactory,
  ComponentFactory,
  getModuleFactory,
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@exxat/fusion/components';

// import { ComponentUtils } from '@exxat/fusion/core';
import { LayoutService } from '../../vertical/layout-1/layout-1.service';
import { FuseSidebarService } from '../../../components/sidebar/sidebar.service';
import { FuseProgressBarService } from '../../../components/progress-bar/progress-bar.service';
import { take, takeUntil } from 'rxjs/operators';
import { RoleBasedAccessService } from '@exxat/fusion/services';
import { MetaConstants, URLConstants } from '@exxat/fusion/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterStateFacade } from '../../../store/facade/router.facade';
import { SnackbarService } from '../../../services/snackbar.service';


@Injectable({providedIn: 'any'})
export class DrawerService implements OnDestroy {
  drawerTitle: BehaviorSubject<string>;
  drawerSize: BehaviorSubject<string>;
  referenceHost: any;
  componentRef: any;
  init: boolean;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _compiler: Compiler,
    private _layoutService: LayoutService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseProgressBarService: FuseProgressBarService,
    private _routerStateFacade: RouterStateFacade,
    private _roleBasedAccessService: RoleBasedAccessService,
    private router: Router,
    private _snackBarService: SnackbarService
  ) {
    this.drawerTitle = new BehaviorSubject(null);
    this.drawerSize = new BehaviorSubject(null);
    this._unsubscribeAll = new Subject();
    window.addEventListener('storage', (event) => {
      if (
        [MetaConstants.TENANTID, MetaConstants.OUCODES].includes(event.key) &&
        !event.newValue
      ) {
        this.closeDrawer();
        this._snackBarService.openCustomSnackBar(
          { message: 'Please select the tenant and program.' },
          5000,
          '',
          'bottom'
        );
        this.router.navigateByUrl(`${URLConstants.LAUNCH_URL}`);
      }
    });
  }

  async showDrawerContent(
    componentSelector: string,
    moduleId,
    data: any,
    entityKey: string,
    primaryAction: string,
    secondaryAction: string,
    isDeleteVisible: boolean
  ) {
    // const factory = await ComponentUtils.getComponentBySelector(this._componentFactoryResolver, this._compiler, moduleId, componentSelector);
    this._layoutService.showPrimaryActionSpinner$.next(false);
    await this.createComponent(
      componentSelector,
      data,
      entityKey,
      primaryAction,
      secondaryAction,
      isDeleteVisible
    );
    this.instantiateFusionForm();
    this.checkForAllEmptyFields();
  }

  instantiateFusionForm() {
    (this.componentRef.instance as FusionFormComponent).data =
      this.componentRef.instance.data;
    (this.componentRef.instance as FusionFormComponent).key =
      this.componentRef.instance.key;
    this._layoutService.isFormValid$.next(
      this.componentRef.instance?.fusionFormGroup?.status.toLowerCase() ===
        'valid'
        ? true
        : false
    );
    this.componentRef.instance?.fusionFormGroup?.statusChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this._layoutService.isFormValid$.next(
          response != null && response.toLowerCase() === 'valid' ? true : false
        );
        this.checkForAllEmptyFields();
      });
  }

  checkForAllEmptyFields() {
    let formData = this.componentRef.instance?.fusionFormGroup?.value;
    let isAllEmpty = true;
    this._routerStateFacade
      .getActiveRouteURL()
      .pipe(take(1))
      .subscribe((routeURL) => {
        if (
          !!routeURL &&
          (routeURL.includes('/admin/profile') ||
            routeURL.includes('/student/profile')) &&
          Object.keys(formData).length > 0
        ) {
          Object.keys(formData)?.forEach((task) => {
            for (let taskField in formData[task]) {
              if (
                formData[task][taskField] !== undefined &&
                formData[task][taskField] !== null &&
                formData[task][taskField] !== ''
              ) {
                isAllEmpty = false;
                return;
              }
            }
          });
          if (isAllEmpty) this._layoutService.isFormValid$.next(false);
        }
      });
  }

  async createComponent(
    componentSelector,
    data: any,
    entityKey: string,
    primaryAction: string,
    secondaryAction: string,
    isDeleteVisible: boolean
  ) {
    this._layoutService.primaryAction = null;
    this._layoutService.secondaryAction = null;
    this._layoutService.isDeleteVisible = isDeleteVisible;
    this._layoutService.referenceHost?.viewContainerRef.clear();
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(componentSelector);
    const compRef =
      this._layoutService.referenceHost?.viewContainerRef.createComponent(
        componentFactory
      );

    compRef.instance.data = data;
    compRef.instance.key = entityKey;
    await this.getRouteParam().then((params) => {
      compRef.instance.routeParam = params;
    });
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = compRef;
    this._layoutService.componentRef = compRef;
    this._layoutService.primaryAction = primaryAction;
    this._layoutService.secondaryAction = secondaryAction;
    this.init = true;
  }

  onPrimaryAction() {
    // this.showActionProgress();
    (
      this._layoutService.componentRef.instance as FusionFormAdapter
    ).primaryAction();
  }

  onSecondaryAction() {
    this.showActionProgress();
    (
      this._layoutService.componentRef.instance as FusionFormAdapter
    ).secondaryAction();
  }

  onPanelClose() {
    (
      this._layoutService.componentRef.instance as FusionFormAdapter
    ).panelClose();
  }

  closeDrawer() {
    this.hideActionProgress();
    this._fuseSidebarService.getSidebar('drawer').close();
  }

  openDrawer(
    componentSelector: string,
    moduleId?: string,
    caption?: string,
    size?: string,
    data?: any,
    entityKey?: string,
    primaryAction?: string,
    secondaryAction?: string,
    featureCode?: string
  ) {
    let isDeleteVisible = true;
    if (secondaryAction?.toLowerCase() === 'delete') {
      isDeleteVisible = this._roleBasedAccessService.hasAccess(featureCode, {
        CAN: ['DELETE']
      });
    }
    this._layoutService.drawerTitle.next(
      caption != null && caption.replace(/\s/g, '').trim() !== ''
        ? caption
        : null
    );
    this._fuseSidebarService.getSidebar('drawer').open();
    this._layoutService.drawerSize.next(size);
    this.showDrawerContent(
      componentSelector,
      moduleId,
      data,
      entityKey,
      primaryAction,
      secondaryAction,
      isDeleteVisible
    );
  }

  getRouteParam() {
    return this._routerStateFacade.getRouteState();
  }

  showActionProgress() {
    this._fuseProgressBarService.show();
  }

  hideActionProgress() {
    this._fuseProgressBarService.hide();
  }

  setPrimaryActionState(isFormvalid: boolean, showSpinner: boolean) {
    this._layoutService.isFormValid$.next(isFormvalid);
    this._layoutService.showPrimaryActionSpinner$.next(showSpinner);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
