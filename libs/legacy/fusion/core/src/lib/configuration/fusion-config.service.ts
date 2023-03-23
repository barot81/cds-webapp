/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';

import {
  AppSettings,
  MicroFrontEnds,
  ServiceEndpoint
} from './types/app-settings';
import { UiSettings } from './types/ui-settings';

export let microfrontends: MicroFrontEnds;

@Injectable({
  providedIn: 'root',
})
export class FusionConfigService {
  public appSettings: AppSettings;
  private _uiSettingsSubject: BehaviorSubject<UiSettings>;
  public readonly _defaultUiSettings: UiSettings;
  public mode: string;
  public mediaListQuery = window.matchMedia('(prefers-color-scheme: dark)');
  public resolve: any;

  constructor(
    private readonly _platform: Platform,
    private readonly _router: Router,
    private _runtimeConfigLoaderService: RuntimeConfigLoaderService
  ) {
    const config = _runtimeConfigLoaderService.getConfig();
    this.appSettings = config?.appSettings;
    this._defaultUiSettings = config?.uiSettings;

    this._init();
  }

  getservice(serviceName: string): ServiceEndpoint {
    return this.appSettings.services[serviceName];
  }

  get(key: any) {
    return this.appSettings[key];
  }

  set uiSettings(value) {
    let config = this._uiSettingsSubject.getValue();
    config = _.merge({}, config, value);
    this._uiSettingsSubject.next(config);
  }

  get uiSettings(): any | Observable<UiSettings> {
    return this._uiSettingsSubject.asObservable();
  }

  private _init(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this._defaultUiSettings.customScrollbars = false;
    }

    this._uiSettingsSubject = new BehaviorSubject(
      _.cloneDeep(this._defaultUiSettings)
    );

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this._router.events
      .pipe(filter((event) => event instanceof RoutesRecognized))
      .subscribe(() => {
        if (
          !_.isEqual(
            this._uiSettingsSubject.getValue().layout,
            this._defaultUiSettings.layout
          )
        ) {
          const config = _.cloneDeep(this._uiSettingsSubject.getValue());
          config.layout = _.cloneDeep(this._defaultUiSettings.layout);
          this._uiSettingsSubject.next(config);
        }
      });

    this.setMicrofrontends();
  }

  setConfig(value, opts = { emitEvent: true }): void {
    let config = this._uiSettingsSubject.getValue();
    config = _.merge({}, config, value);
    if (opts.emitEvent === true) {
      this._uiSettingsSubject.next(config);
    }
  }

  getConfig(): Observable<UiSettings> {
    return this._uiSettingsSubject.asObservable();
  }

  // setting active mode
  setActiveMode(mode: string) {
    this.mode = mode;
  }

  // returning active mode
  getActiveMode(): string {
    return this.mode;
  }

  //checking mode based on OS theme preference using prefers-color-scheme media matcher
  isDarkMode(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      if (!window.matchMedia) {
        subscriber.error(new Error('No windows Media Match available'));
      }

      this.resolve = (event: MediaQueryListEvent) => {
        subscriber.next((event as MediaQueryListEvent).matches);
      };

      this.mediaListQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaListQuery.addEventListener('change', this.resolve);
      subscriber.next(this.mediaListQuery.matches);

      return () => {
        this.mediaListQuery.removeEventListener('change', this.resolve);
        subscriber.complete();
      };
    });
  }

  resetAutoMode() {
    this.mediaListQuery.removeEventListener('change', this.resolve);
  }

  resetToDefaults(): void {
    this._uiSettingsSubject.next(_.cloneDeep(this._defaultUiSettings));
  }

  setMicrofrontends() {
    microfrontends = this.appSettings?.microfrontends;
  }
}
