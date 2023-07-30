import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { FusionConfigService } from '../../configuration/fusion-config.service';
import { FoundationInjector } from '../../injector/foundation-injector';

@Injectable({ providedIn: 'any' })
export class LoggingService {
  private static appInsights;
  private static router;
  private static excludedTenants = [];

  static setApplicationInsights() {
    LoggingService.router = FoundationInjector.get(Router);
    const config = FoundationInjector.get(FusionConfigService);
    // LoggingService.appInsights = new ApplicationInsights({
    //   config: {
    //     instrumentationKey: config.appSettings.instrumentationKey,
    //     enableAutoRouteTracking: true, // send pageViews on route change
    //     maxAjaxCallsPerView: -1, // Send all the events (default is 500 per page)
    //   },
    // });

    // LoggingService.appInsights.loadAppInsights();

    // ITelemetryInitializer - to filer requests, traces | add custom properties to telemetry data
    // LoggingService.appInsights.addTelemetryInitializer((envelope) => {
    //   const storage = sessionStorage.getItem('User')
    //     ? sessionStorage
    //     : localStorage;
    //   if (storage.getItem('User')) {
    //     const user = JSON.parse(storage.getItem('User'));
    //     LoggingService.appInsights.setAuthenticatedUserContext(user?.UserName);
    //   }
    // });

    LoggingService.excludedTenants =
      config?.appSettings?.clickTrackingSettings?.excludedTenants;
  }

  static logPageView(name?: string, uri?: string) {
    LoggingService.appInsights.trackPageView({ name, uri });
  }
  static startNavigationEvent(url: string) {
    // early comments
    // LoggingService.appInsights.context.operation.id =
    //   window['Microsoft'].ApplicationInsights.Util.newId();
    //LoggingService.appInsights.context.operation.name = url;
    // LoggingService.appInsights.startTrackEvent(url);
  }
  static endNavigationEvent(url: string) {
    // LoggingService.appInsights.stopTrackEvent(url, { type: 'PAGE LOAD TIME' });
  }
  static setUserName(userName: string) {
    // LoggingService.appInsights.setAuthenticatedUserContext(userName);
  }

  static clearUserName() {
    // LoggingService.appInsights.clearAuthenticatedUserContext();
  }

  static logEvent(name: string, properties?: any, measurements?: any) {
    // LoggingService.appInsights.trackEvent({
    //   name: name,
    //   properties: properties,
    //   measurements: measurements,
    // });
  }

  static logException(
    exception: Error,
    handledAt?: string,
    properties?: any,
    measurements?: any
  ) {
    const error: any = {};
    error.exception = exception;
    const props = { ...properties, mainHash: localStorage.getItem('mainHash') };
    // LoggingService.appInsights.trackException(
    //   error,
    //   handledAt,
    //   props,
    //   measurements
    // );
  }

  static logTrace(message: string, properties?: any, severityLevel?: any) {
    const props = { ...properties, mainHash: localStorage.getItem('mainHash') };
    // LoggingService.appInsights.trackTrace({
    //   message: message,
    //   properties: props,
    //   severityLevel: severityLevel,
    // });
  }

  static logCustomEvents(event) {
    let user, currentOrgUnitInfo;
    const storage = sessionStorage.getItem('User')
      ? sessionStorage
      : localStorage;
    if (storage.getItem('User') && storage.getItem('orgUnitInformation')) {
      user = JSON.parse(storage.getItem('User'));
      currentOrgUnitInfo = JSON.parse(
        storage.getItem('orgUnitInformation')
      )?.find((x) => x.isSelected);
    }
    if (
      user &&
      currentOrgUnitInfo &&
      !LoggingService.excludedTenants?.includes(currentOrgUnitInfo?.tenantId)
    ) {
      const userId = user.Id;
      const userRoles = user?.UserRoles?.map((a) => a.RoleCode)?.toString();
      const tenantId = currentOrgUnitInfo?.tenantId;
      const ouCode = currentOrgUnitInfo?.oucode;
      const route = LoggingService.router.url;
      const title = document.title;
      let clickedText;
      if (event?.target?.innerText) {
        //Button Clicked
        clickedText = event?.target?.innerText;
      } else if (event?.target?.nextElementSibling?.innerText) {
        //Checkbox Clicked
        clickedText = event?.target?.nextElementSibling?.innerText;
      } else if (event?.target?.parentElement?.nextElementSibling?.innerText) {
        clickedText =
          event?.target?.parentElement?.nextElementSibling?.innerText; // RadioButton Clicked
      }
      // if (clickedText && clickedText.trim() != '')
      //   LoggingService.logEvent(title, {
      //     TenantId: tenantId,
      //     OuCode: ouCode,
      //     userId: userId,
      //     userRoles: userRoles,
      //     Route: route,
      //     ClickedText: clickedText,
      //   });
    }
  }
}
