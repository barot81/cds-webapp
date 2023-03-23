import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RuntimeConfigLoaderService } from '@exxat-core/angular-runtime-config';
import { FusionConfigService, LoggingService } from '@exxat/fusion/core';
import { SplashScreenService } from '@exxat/ux';
import { FusionNavigationService } from '@exxat/fusion/services';

@UntilDestroy()
@Component({
  selector: 'exxat-angular-bootstrap',
  templateUrl: './bootstrap.component.html',
})
export class ExxatAngularBootstrapComponent implements OnInit {
  fuseConfig: any;
  currentUrl: any = '';
  click$: Observable<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    private router: Router,
    private _fusionConfigService: FusionConfigService,
    private splashScreenService: SplashScreenService,
    private route: ActivatedRoute,
    private _fusionNavigationService: FusionNavigationService
  ) {
    LoggingService.setApplicationInsights();
    this.setNavigations();
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
  }

  ngOnInit() {
    this.getLayoutConfig();
    this.click$?.subscribe((event) => {
      LoggingService.logCustomEvents(event);
    });
  }

  getLayoutConfig() {
    this._fusionConfigService.uiSettings
      .pipe(untilDestroyed(this))
      .subscribe((runtimeConfig) => {
        if (runtimeConfig) {
          this.fuseConfig = runtimeConfig;
          this.loadLayoutType();
          this.loadStyle(this.fuseConfig.colorTheme);
        }
      });
  }

  loadLayoutType() {
    if (this.fuseConfig.layout.width === 'boxed') {
      this.document.body.classList.add('boxed');
    } else {
      this.document.body.classList.remove('boxed');
    }
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
  }

  setNavigations() {
    const navigations = this.route.snapshot.data?.navigations;
    if (navigations) {
      this._fusionNavigationService.updateNavigationIfChanged(
        navigations,
        null
      );
    }
  }
}
