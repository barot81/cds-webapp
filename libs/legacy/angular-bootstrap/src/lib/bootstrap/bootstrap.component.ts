import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Routes, ActivatedRoute } from '@angular/router';
import { LookupAPIClientService } from '@zhealthcare/account/meta';
import { FeatureFlagService } from '@zhealthcare/fusion-feature-flag';
import {
  FusionConfigService,
  NotificationService,
  UserTypeService,
  OrgFacade,
  UserFacade,
  LoggingService,
  GlobalVariable,
  Logger,
} from '@zhealthcare/fusion/core';
import { NavigationChangeDetector, UserPersona } from '@zhealthcare/fusion/models';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import { SplashScreenService } from '@zhealthcare/ux';
import {
  filter,
  fromEvent,
  lastValueFrom,
  Observable,
  Subject,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { RoleConfigType } from './type';
import { ZendeskUtilService } from './utils/zendesk/zendesk-util.service';

@Component({
  selector: 'zhealthcare-angular-bootstrap',
  templateUrl: './bootstrap.component.html'
})
export class ZhealthcareAngularBootstrapLegacyComponent implements OnInit, OnChanges, OnDestroy {
  @Input() routes: Routes;
  @Input() roleConfig: RoleConfigType;
  @Input() navigations: NavigationChangeDetector;

  fuseConfig: any;
  currentUrl: any = '';
  showNotification = true;
  click$: Observable<any>;
  versionCheckFrequency = 1000 * 60;

  private _unsubscribeAll: Subject<any>;

  allowedPersonas = [UserPersona.Student];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any,
    private platform: Platform,
    private navigationService: FusionNavigationService,
    private splashScreenService: SplashScreenService,
    private _fusionConfigService: FusionConfigService,
    private notificationService: NotificationService,
    public _userTypeService: UserTypeService,
    private _lookupAPIClientService: LookupAPIClientService,
    private _orgFacade: OrgFacade,
    private _featureFlagService: FeatureFlagService,
    private _http: HttpClient,
    private readonly userFacade: UserFacade,
    private readonly orgFacade: OrgFacade,
    private zendeskUtilService: ZendeskUtilService,
    private readonly userTypeService: UserTypeService
  ) {
    LoggingService.setApplicationInsights();
    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url != '') {
          LoggingService.startNavigationEvent(e.url);
        }
      }
      if (e instanceof NavigationEnd) {
        if (e.url != '') {
          this.currentUrl = e.url;
          if (this.currentUrl.includes('#app_main_content')) {
            this.currentUrl = this.currentUrl.replace('#app_main_content', '');
          }
          LoggingService.endNavigationEvent(e.url);
        } else {
          this.currentUrl = '';
        }
      }
    });

    // Add is-mobile class to the body if the platform is mobile
    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    if (
      _fusionConfigService?.appSettings?.clickTrackingSettings
        ?.clickTrackingEnabled
    ) {
      this.click$ = fromEvent(document, 'click');
    }
    this.routeChangeListener();
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  setNavigations() {
    if (this.navigations) {
      this.navigationService.updateNavigationIfChanged(
        this.navigations,
        null
      );
    }
  }

  routeChangeListener() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (
          event.url === '/dashboard' &&
          this.roleConfig &&
          Object.keys(this.roleConfig).length > 0
        ) {
          this.router.navigate(this.roleConfig[this._userTypeService.getUserType()]);
        }
      });
  }

  ngOnChanges(): void {
    this.router.resetConfig([...this.router.config, ...this.routes]);
    this.setNavigations();
  }

  async ngOnInit(): Promise<void> {
    // Subscribe to config changes
    this._fusionConfigService.uiSettings
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        this.loadStyle(this.fuseConfig.colorTheme);

        this.document.body.classList.add(this.fuseConfig.colorTheme);

        setTimeout(() => {
          for (let i = 0; i < this.document.body.classList.length; i++) {
            const className = this.document.body.classList[i];

            if (
              className.startsWith('theme-') &&
              className !== this.fuseConfig.colorTheme
            ) {
              this.document.body.classList.remove(className);
            }
          }
        }, 500);
      });

    this.click$?.subscribe((event) => {
      LoggingService.logCustomEvents(event);
    });

    this.selectedOucodeListener();
    this.zendeskUtilService.prismChat(this._unsubscribeAll);
  }

  selectedOucodeListener() {
    this._orgFacade.selectedOucode$
      .pipe(withLatestFrom(this._orgFacade.OrgState$))
      .subscribe(async ([selectedOUCode, orgState]) => {
        if (selectedOUCode) {
          await this.getSettingDictionary(selectedOUCode, orgState);
          await this.getFeatureFlag();
        }
      });
  }

  async getSettingDictionary(selectedOUCode, orgState) {
    const settingDictionaryForOUCode = await lastValueFrom(
      this._lookupAPIClientService.getSettingDictionary(
        orgState?.TenantWithOuCodeTree?.TenantId,
        selectedOUCode?.Oucode,
        selectedOUCode?.Name
      )
    ).catch((error) => {
      Logger.error(
        `Error getting setting dictionary for selected oucode ${selectedOUCode?.Oucode} - ${error?.message}`
      );
    });
    if (settingDictionaryForOUCode) {
      GlobalVariable.settingDictionary = new Map(
        Object.entries(settingDictionaryForOUCode)
      );
      this.navigationService.aliasLabels.next(GlobalVariable.settingDictionary);
    }
  }

  async getFeatureFlag() {
    this._featureFlagService.resetFeatureFlags();
    await this._featureFlagService.initialize();
  }

  loadStyle(colorTheme: string) {
    const themeIntials = colorTheme.split('-');

    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink && themeLink !== null) {
      if (
        themeLink.href.replace(themeLink.baseURI, '') !==
        themeIntials[0] + '-' + themeIntials[1] + '.css'
      ) {
        themeLink.href = themeIntials[0] + '-' + themeIntials[1] + '.css';
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
