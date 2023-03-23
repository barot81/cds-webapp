import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

import { FusionFormAdapter } from '@exxat/fusion/components';

import { LocationStrategy } from '@angular/common';
import { FusionNavigationService } from '@exxat/fusion/services';

import { AuthService } from '@exxat-core/angular-oauth-oidc';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { FuseSidebarService } from '../../../components/sidebar/sidebar.service';
import { ManifoldPanel } from '../../components/manifold-panel/manifold-panel';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  drawerTitle: BehaviorSubject<string>;
  drawerSize: BehaviorSubject<string>;
  exxatCloseDrawerAction$: Subject<any>;
  isFormValid$: BehaviorSubject<boolean>;
  showPrimaryActionSpinner$: BehaviorSubject<boolean>;
  componentRef;
  referenceHost;
  primaryAction;
  secondaryAction;
  closeOnNavigation = true;
  isDeleteVisible;
  _orgTimzone$: BehaviorSubject<string>;

  private footerVisible = new BehaviorSubject<boolean>(false);
  footerVisible$ = this.footerVisible.asObservable();

  private _isButtonAvailable = new BehaviorSubject<boolean>(false);

  /* Region Manifold Declarations */
  componentType: string;
  manifoldPanelComponentRef;
  manifoldPanelInstances = 0;
  manifoldPanelMap = new Map<number, ManifoldPanel>();
  manifoldPanelCompRef = new Map<number, any>();
  manifoldPanelFormMap = new Map<number, FormGroup>();
  /* #endregion */

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _confirmDialogService: ConfirmDialogService,
    private _location: LocationStrategy,
    private readonly _navService: FusionNavigationService, // private readonly _manifoldPanelService: ManifoldPanelService
    private oauthService: AuthService
  ) {
    this.drawerTitle = new BehaviorSubject(null);
    this.drawerSize = new BehaviorSubject(null);
    this.exxatCloseDrawerAction$ = new Subject();
    this.isFormValid$ = new BehaviorSubject(false);
    this.showPrimaryActionSpinner$ = new BehaviorSubject(false);
    this._orgTimzone$ = new BehaviorSubject(null);

    this._location.onPopState(async () => {
      // Close Opened Drawer On Browser Back Button Event
      if (
        this.componentRef &&
        this.componentRef != null &&
        this._fuseSidebarService.getSidebar('drawer').opened
      ) {
        this._navService.setDefendAgainstBrowserBackButton(true);
        await this.foldSidebarTemporarily();
      } else {
        this._navService.setDefendAgainstBrowserBackButton(false);
      }
    });
  }

  foldSidebarTemporarily(): void {
    if (this.closeOnNavigation) {
      if (this.componentRef.instance?.fusionFormGroup?.dirty) {
        const message = `You have unsaved changes which will be lost if you navigate away. Are you sure you wish to discard these changes?`;
        this._confirmDialogService.open(message, {
          ok: 'Leave',
          cancel: 'Stay',
        });
        this._confirmDialogService
          .confirmDialogAction()
          .subscribe((confirmed) => {
            if (confirmed) {
              this.referenceHost?.viewContainerRef.clear();
              this._fuseSidebarService.getSidebar('drawer').toggleOpen();
              this._navService.setDefendAgainstBrowserBackButton(false);
            }
          });
      } else {
        this.referenceHost?.viewContainerRef.clear();
        this._fuseSidebarService.getSidebar('drawer')?.toggleOpen();
        this._navService.setDefendAgainstBrowserBackButton(false);
      }
      this.exxatCloseDrawerAction$.next('foldSidebar');
    } else {
      (this.componentRef.instance as FusionFormAdapter).panelClose();
      this._navService.setDefendAgainstBrowserBackButton(false);
    }
  }

  public setFooterVisibility(value: boolean): void {
    this.footerVisible.next(value);
  }

  public get getFooterVisibleValue(): boolean {
    return this.footerVisible.value;
  }

  public setChatButtonVisibility(value: boolean): void {
    this._isButtonAvailable.next(value);
  }

  public get getChatButtonVisibleValue(): boolean {
    return this._isButtonAvailable.value;
  }
  
  public getUser() {
    return this.oauthService.getIdentityClaims() ?? null;
  }
}
