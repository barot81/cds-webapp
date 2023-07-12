/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { delay, map, take, takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '../../../components/sidebar/sidebar.service';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AuthService,
  FusionConfigService,
  HttpConstants,
  Logger,
  MetaConstants,
  OrgFacade,
  URLConstants,
  UserFacade,
  UserSettingsSandbox,
  UserService
} from '@zhealthcare/fusion/core';
import { TokenModel, User, UserPersona } from '@zhealthcare/fusion/models';
import { ThemeSelectionService } from '../../../components';
import { productNavigation } from '../../../navigation/navigation';
import { PageFacade } from '../../../store/facade/page.facade';
import { themes } from '../../constants/theme';
import { LayoutService } from '../../vertical/layout-1/layout-1.service';
import { IdentityComponentMapService } from './account/services';
import { ConsentDetailsPopupComponent } from './consent-details-popup/consent-details-popup.component';
import { HeaderDrawerService } from './header-drawer.service';
import { HeaderService } from './header.service';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  tooltipOptions = {
    contentType: 'string',
    placement: 'bottom',
    trigger: 'hover',
    'max-width': 350,
    pointerEvents: 'auto',
  };
  themes = themes;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  navigation: any;
  selectedLanguage: any;
  lastLoginTime: any = new Date();
  private _unsubscribeAll: Subject<any>;
  loggedInUser$: Observable<any>;
  facilityId$: Observable<string>;
  selectedOucodeName$: Observable<string>;
  selectedOucode$: Observable<string>;
  hasDelegateRole$: Observable<boolean>;
  pageTitle: string;
  scheduledDowntimes: any;
  showNotificationBanner = false;
  isAdmin = false;
  counter = 0;
  sessionTimeOutPopup;
  tokenAutoRenewTimeout;
  isDelegatorUser = false;
  userName: any;
  isStudent = false;

  /**
   * Constructor
   *
   */ constructor(
    private _fusionConfigService: FusionConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private router: Router,
    public pageFacade: PageFacade,
    private userFacade: UserFacade,
    private orgFacade: OrgFacade,
    public dialog: MatDialog,
    public identityComponentMapService: IdentityComponentMapService,
    private authService: AuthService,
    public _HeaderDrawerService: HeaderDrawerService,
    public _themeSelection: ThemeSelectionService,
    private _userSettingsSandbox: UserSettingsSandbox,
    public readonly _layoutService: LayoutService,
    public readonly _headerService: HeaderService,
    private readonly _userService: UserService
  ) {
    if (localStorage.getItem('User')) {
      const userRoles = JSON.parse(localStorage.getItem('User'))?.UserRoles;
      const arr = userRoles?.filter(
        (x) => x?.RoleCode?.includes('Admin') || x?.UserType === 'Administrator'
      );
      if (arr?.length > 0) this.isAdmin = true;
      this.isStudent = userRoles?.some(
        (x) =>
          x?.UserType?.includes('Student') &&
          !x?.RoleCode?.includes('ViewAsStudent')
      );
    }
    if (localStorage.getItem('LastLoginTime') !== 'null')
      this.lastLoginTime = new Date(localStorage.getItem('LastLoginTime'));
    else this.lastLoginTime = null;
    this.navigation = productNavigation;
    this._unsubscribeAll = new Subject();
    this.loggedInUser$ = this.userFacade.UserState$.pipe(
      takeUntil(this._unsubscribeAll)
    );
    this.hasDelegateRole$ = this.loggedInUser$.pipe(
      map((x) =>
        x?.user?.UserRoles?.some((y) => y.RoleCode.includes('Delegate.'))
      )
    );
    this.facilityId$ = this.orgFacade.OrgState$.pipe(
      takeUntil(this._unsubscribeAll),
      map((x) => {
        if (x.FacilityWiseStatuses?.FacilityId !== HttpConstants.BASE)
          return x.FacilityWiseStatuses?.FacilityId;
      })
    );

    this.pageFacade.pageTitle$
      .pipe(delay(0))
      .subscribe((x) => (this.pageTitle = x));

    // Set the private defaults
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    clearTimeout(this.sessionTimeOutPopup);

    clearTimeout(this.tokenAutoRenewTimeout);
    Logger.trace(
      "Header's ngOnDestroy() called. destroyed Session timeout pop up and token auto renew timeouts."
    );

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the config changes
    this._fusionConfigService.uiSettings
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    // this.getScheduledDowntimeInfo();
    this.logoutOnClearingStorage();
    // this.getUserSettings();

    if (JSON.parse(sessionStorage.getItem(MetaConstants.IsDelegateUser))) {
      this.isDelegatorUser = true;
    }
    this.setSelectedThemeColor();
  }

  setSelectedThemeColor() {
    this._fusionConfigService.uiSettings
      .pipe(take(1))
      .subscribe((config: any) => {
        this._themeSelection.selectedThemeColor$.next(
          this.themes?.find((x) => config?.colorTheme?.includes(x?.id))?.primary
        );
      });
  }

  hideReleaseNotificationBanner() {
    this._headerService.showReleaseNotes.next(false);
    localStorage.setItem('showReleaseNotes', 'true');
  }

  /**
   * Toggle sidebar open
   *
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
    setTimeout(() => {
      this._fuseSidebarService.shiftFocus();
    }, 100);
  }



  /**
   * Search
   *
   */
  search(value): void {
    // Do your search here...
    console.log(value);
  }

  signOut() {
    const isV3V4 = JSON.parse(localStorage.getItem('isV3V4'));
    this.userFacade.LogOut();
    localStorage.removeItem('StudentId');
    localStorage.clear();
    this.authService.redirectUrl = undefined;
    if (isV3V4)
      this.router.navigate([
        '/externalRedirect',
        {
          externalUrl: this._fusionConfigService.getservice('v3.login')
            .endpoint,
        },
      ]);
  }

  navigateToHelpCenter() {
    this.router.navigateByUrl('/help');
  }

  openReleaseNotes() {
    this.pageTitle = 'Release Notes';
    this.router.navigateByUrl('/releasenotes');
  }

  openConsentDetailsPopup() {
    const dialogRef = this.dialog.open(ConsentDetailsPopupComponent, {
      width: '50vw',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  switchBack() {
    this.userFacade.UserState$.pipe(take(1)).subscribe((user) => {
      this.selectedOucode$.pipe(take(1)).subscribe((oucode) => {
        const adminUser: User = {
          ...user.user,
          ManagedUserAccount: null,
          ReferenceKey: null,
        };
        this.userFacade.updateUserSuccess(adminUser);
        localStorage.setItem(
          MetaConstants.MANAGE_ACCOUNT_SWITCH_BACK_KEY,
          oucode
        );

        this.router.navigateByUrl(URLConstants.ADMIN_LAUNCH_URL);
      });
    });
  }

  redirectToLaunch() {
    this.userFacade.UserState$.pipe(take(1)).subscribe((user) => {
      if (user?.user?.ManagedUserAccount?.IsActive)
        this.router.navigateByUrl(URLConstants.DASHBOARD_URL);
      else {
        const launchUrl = `admin${URLConstants.LAUNCH_URL}`;
        this.router.navigateByUrl(launchUrl);
      }
    });
  }

  getScheduledDowntimeInfo() {
    if (
      localStorage.getItem('Auth') &&
      window.location.pathname !== URLConstants.DELEGATE_PATH &&
      this.checkTokenExpiration()
    ) {
      this.authService.getScheduledDowntimeInfo().subscribe((data) => {
        if (data?.refreshInterval) {
          if (
            this._fusionConfigService.appSettings.production &&
            data.refreshInterval < 3600
          )
            data.refreshInterval = 3600;
          const source = interval(data.refreshInterval * 1000);
          source.pipe(takeUntil(this._unsubscribeAll)).subscribe((val) => {
            if (this.checkTokenExpiration()) {
              this.authService.getScheduledDowntimeInfo().subscribe((data) => {
                this.setScheduledDowntimeInfo(data, true);
              });
            }
          });
        }
        const showBanner = localStorage.getItem('scheduledDowntime.showBanner');
        if (showBanner == 'true') {
          this.setScheduledDowntimeInfo(data, true);
          localStorage.removeItem('scheduledDowntime.showBanner');
        } else this.setScheduledDowntimeInfo(data, false);
      });
    }
  }
  checkTokenExpiration(): boolean {
    const currentLoginTime = JSON.parse(
      localStorage.getItem('CurrentLoginTime')
    );
    const tokenModel: TokenModel = JSON.parse(localStorage.getItem('Auth'));
    const loginDateTime = new Date(currentLoginTime);
    loginDateTime.setMinutes(
      loginDateTime.getMinutes() + parseInt(tokenModel.expiration)
    ); //calculate the token expiration datetime
    //loginDateTime is now expiration time
    const currentSystemDate = new Date();
    if (currentSystemDate > loginDateTime) {
      return false;
    }
    return true;
  }
  setScheduledDowntimeInfo(data: any, showBanner: boolean = true) {
    this.replaceDateWithCurrentTimezone(data?.scheduledDowntimes);
    this.scheduledDowntimes = data?.scheduledDowntimes;
    if (this.scheduledDowntimes && showBanner)
      this.showNotificationBanner = true;
    else this.showNotificationBanner = false;
  }
  private replaceDateWithCurrentTimezone(downtimes) {
    downtimes?.forEach((downtime) => {
      const dateSeparator = '##';
      const matches = downtime.messageText?.match(
        new RegExp(dateSeparator + '(.*)' + dateSeparator)
      );
      if (matches) {
        const utcDate = matches[1];
        const localDate = new Date(utcDate).toString();
        downtime.messageText = downtime.messageText.replace(
          matches[0],
          localDate
        );
      }
    });
  }

  logoutOnClearingStorage() {
    window.addEventListener('storage', (event) => {
      if (
        event.key == null &&
        (localStorage.getItem('Auth') == null || undefined)
      ) {
        this.userFacade.AuthState$.pipe(take(1)).subscribe((auth) => {
          if (auth.refreshToken) {
            this.signOut();
          }
        });
      }
    });
  }

  closeNotificationBanner() {
    this.showNotificationBanner = false;
  }


  getUserSettings() {
    if (localStorage.getItem('User')) {
      const userId = JSON.parse(localStorage.getItem('User'))?.Id;
      if (userId) {
        this._userSettingsSandbox.getUserSettings(userId).subscribe((resp) => {
          if (resp != null) {
            const colorTheme = `${resp?.theme?.colorScheme}-${resp?.theme?.mode}`;
            this._fusionConfigService.uiSettings = { colorTheme: colorTheme };
            this._themeSelection.selectedThemeColor$.next(
              this.themes?.find((x) => colorTheme?.includes(x?.id))?.primary
            );
          }
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.userName = this._userService.getUserName() ??  this._layoutService.getUser()?.name;
  }
}
