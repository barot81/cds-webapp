/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import {
  AuthService,
  EventsService,
  FusionConfigService,
  UserFacade,
  UserSettingsModel,
  UserSettingsSandbox,
} from '@zhealthcare/fusion/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '@zhealthcare/fusion/core';
import { BehaviorSubject, take } from 'rxjs';
import { ThemeSelectionService } from '../../../../components/theme-selection-sidebar/services/theme-selection.service';
import { themes } from '../../../constants/theme';
import { LayoutService } from '../../../vertical/layout-1/layout-1.service';
import { IdentityComponentMapService } from '../account';
import { ConsentDetailsPopupComponent } from '../consent-details-popup/consent-details-popup.component';

export type ThemeOption = 'theme-blue' | 'theme-purple' | string;

export type ModeOption = 'light' | 'dark' | string;

@Component({
  selector: 'zhealthcare-user-setting-drawer',
  templateUrl: './user-setting-drawer.component.html',
})
export class UserSettingDrawerComponent implements OnInit {
  loggedInUser = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUser.asObservable();
  lastLoginTime: any = new Date();

  selectedColorTheme: string;
  themes = themes;

  modes = [
    {
      id: 'light',
      icon: 'fa-sun',
      src: 'assets/images/light_mode.png',
    },
    {
      id: 'dark',
      icon: 'fa-moon',
      src: 'assets/images/dark_mode.png',
    },
  ];

  private selectedTheme = new BehaviorSubject<ThemeOption>('theme-blue');
  public selectedTheme$ = this.selectedTheme.asObservable();

  private selectedMode = new BehaviorSubject<ModeOption>('light');
  public selectedMode$ = this.selectedMode.asObservable();

  fuseConfig: any;
  form: FormGroup;
  userDetails: Record<string, any>;

  /**
   *
   */
  constructor(
    private router: Router,
    private authService: AuthService,
    private masalService: MsalService,
    public dialog: MatDialog,
    private _userFacade: UserFacade,
    private _fusionConfigService: FusionConfigService,
    private _formBuilder: FormBuilder,
    public identityComponentMapService: IdentityComponentMapService,
    private _userSettingsSandbox: UserSettingsSandbox,
    private _layoutService: LayoutService,
    private oauthService: OAuthService,
    private _themeSelectionService: ThemeSelectionService,
    private _eventsService: EventsService,
    private readonly userSerive: UserService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {
    if (localStorage.getItem('LastLoginTime') !== 'null')
      this.lastLoginTime = new Date(localStorage.getItem('LastLoginTime'));
    else this.lastLoginTime = null;

    this._userFacade.UserState$.subscribe((data) => {
      if (data && data !== null) {
        this.loggedInUser.next(data.user);
      }
    });
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      colorTheme: new FormControl(),
      customScrollbars: new FormControl(),
      layout: new FormGroup({
        style: new FormControl(),
        width: new FormControl(),
        navbar: new FormGroup({
          primaryBackground: new FormControl(),
          secondaryBackground: new FormControl(),
          hidden: new FormControl(),
          folded: new FormControl(),
          position: new FormControl(),
          variant: new FormControl(),
        }),
        header: new FormGroup({
          customBackgroundColor: new FormControl(),
          background: new FormControl(),
          hidden: new FormControl(),
          position: new FormControl(),
        }),
        footer: new FormGroup({
          customBackgroundColor: new FormControl(),
          background: new FormControl(),
          hidden: new FormControl(),
          position: new FormControl(),
        }),
        sidepanel: new FormGroup({
          hidden: new FormControl(),
          position: new FormControl(),
        }),
      }),
    });

    // Subscribe to the config changes
    this._fusionConfigService.uiSettings.pipe(take(1)).subscribe((config) => {
      // Update the stored config
      this.fuseConfig = config;

      if (this.fuseConfig?.colorTheme && this.fuseConfig?.colorTheme !== null) {
        const splitted = this.fuseConfig?.colorTheme.split('-', 3);
        if (splitted && splitted !== null && splitted.length > 0) {
          this.selectedTheme.next(
            (splitted[0] as string).trim().toLowerCase() +
              '-' +
              (splitted[1] as string).trim().toLowerCase()
          );
          this.selectedMode.next((splitted[2] as string).trim().toLowerCase());
        }
      }

      // Set the config form values without emitting an event
      // so that we don't end up with an infinite loop

      this.form.setValue(config, { emitEvent: false });
    });

    // Subscribe to the form value changes
    this.form.valueChanges.pipe().subscribe((config) => {
      // Update the config
      this._fusionConfigService.uiSettings = config;
    });

    this.selectedTheme$.subscribe((value) => {
      if (value && value !== null) {
        this.setSelectedColorTheme();
      }
    });

    this.selectedMode$.subscribe((value) => {
      if (value && value !== null) {
        this.setSelectedColorTheme();
      }
    });

    this.getUserDetails();
  }

  setSelectedColorTheme() {
    this.selectedColorTheme =
      this.selectedTheme.value + '-' + this.selectedMode.value;

    this.form.get('colorTheme').patchValue(this.selectedColorTheme);
    this._themeSelectionService.selectedThemeColor$.next(
      this.themes?.find((x) => this.selectedColorTheme?.includes(x?.id))
        ?.primary
    );
  }

  changeTheme(theme: ThemeOption): void {
    if (theme && theme !== null) {
      this.selectedTheme.next(theme);
      this.updateUserSettings();
    }
  }

  changeMode(mode: ModeOption): void {
    if (mode && mode !== null) {
      this.selectedMode.next(mode);
      this.updateUserSettings();
    }
  }

  openConsentDetailsPopup() {
    const dialogRef = this.dialog.open(ConsentDetailsPopupComponent, {
      width: '50vw',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  signOut() {
    this._eventsService.publish('zhealthcare_user_log_out');
    if (this._layoutService.getUser()) this.oauthService.logOut();
    else if (JSON.parse(localStorage.getItem('isAuthenticated'))) {
      this.handleAzureAdLogout();
    } else {
      this._userFacade.LogOut();
      localStorage.clear();
      this.authService.redirectUrl = undefined;
    }
  }

  private handleAzureAdLogout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    const activeAccount =
      this.masalService.instance.getActiveAccount() ||
      this.masalService.instance.getAllAccounts()[0];

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.masalService.logoutPopup({
        account: activeAccount,
      });
    } else {
      this.masalService.logoutRedirect({
        account: activeAccount,
        postLogoutRedirectUri: `${window.location.href}`,
      });
    }
    // this.router.navigateByUrl('Account/login');
  }

  public getFirstChar(value: string): string {
    if (value) {
      return value.charAt(0).toUpperCase();
    }
  }

  updateUserSettings() {
    if (this.selectedMode.value !== null && this.selectedTheme.value !== null) {
      const userSettings: UserSettingsModel = {
        userId: JSON.parse(localStorage.getItem('User'))?.Id,
        theme: {
          mode: this.selectedMode.value,
          colorScheme: this.selectedTheme.value,
        },
      };
      this._userSettingsSandbox.updateUserSettings(userSettings).subscribe();
    }
  }

  getUserDetails() {
    const userName = this.userSerive.getUserName()?.split(' ');
    this.userDetails = userName
                  ? {  given_name: userName[0],  family_name: userName[1] }
                  : this._layoutService.getUser();
    this.userDetails.email = this.userSerive.getEmail();
  }
}
