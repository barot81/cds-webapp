import { OrgFacade } from './../../store/facades/org.facade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FusionConfigService } from './../../configuration/index';

import { FoundationInjector } from './../../injector/foundation-injector';
import { HttpResponseHandler } from './httpResponseHandler.service';
import { UserFacade } from './../../store/facades/user.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FusionSnackbarService } from '../../component/custom-snackbar/snackbar.service';
/**
 * Supported @Produces media types
 */

export enum MediaType {
  JSON,
  FORM_DATA
}

@Injectable({providedIn: 'any'})
export class HttpService {
  protected httpClient: HttpClient;
  protected httpResponseHandler: HttpResponseHandler;
  protected configService: FusionConfigService;
  protected userFacade: UserFacade;
  protected orgFacade: OrgFacade;
  protected encryptionEnabled: boolean;
  protected matSnackBar: MatSnackBar;
  protected router: Router;
  protected _snackbarService: FusionSnackbarService;

  public constructor() {
    this.httpClient = FoundationInjector.get(HttpClient);
    this.httpResponseHandler = FoundationInjector.get(HttpResponseHandler);
    this.configService = FoundationInjector.get(FusionConfigService);
    this.userFacade = FoundationInjector.get(UserFacade);
    this.orgFacade = FoundationInjector.get(OrgFacade);
    this.encryptionEnabled =
      this.configService?.appSettings?.Cryptography?.EnableEncryption ?? false;
    this.matSnackBar = FoundationInjector.get(MatSnackBar);
    this.router = FoundationInjector.get(Router);
    this._snackbarService = FoundationInjector.get(FusionSnackbarService);
  }

  protected getBaseUrl(): string {
    this.encryptionEnabled =
      this.configService.appSettings?.Cryptography?.EnableEncryption ?? false;
    return this.configService.appSettings?.auth?.endpoint ?? '';
  }

  protected geGatewayUrl(): string {
    return this.configService.appSettings?.gateway?.endpoint ?? '';
  }

  public getEndpoint(targetUrl: string) {
    targetUrl =
      targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
        ? targetUrl
        : this.geGatewayUrl() != ''
        ? this.geGatewayUrl() + targetUrl
        : targetUrl;
    return targetUrl;
  }

  protected getDefaultHeaders(): Object {
    return null;
  }
}
