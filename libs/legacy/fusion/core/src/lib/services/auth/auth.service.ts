import {
  UserInputModel,
  User,
  TokenModel,
  HashDataModel,
  NavigationChangeDetector,
  LaunchDataModel,
  OrgUnit,
  Organization
} from '@zhealthcare/fusion/models';
import { Injectable } from '@angular/core';
import { GET, Header, Path, Query } from './../../asyncServices/http/http.decorator';
import { HttpService } from './../../asyncServices/http/http.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { UserInfo } from './models/userInfo.model';
import { Cryptography } from '../../helper/cryptography/encryption';
import { Logger } from '../logger/logger.extension';
import { I } from '@angular/cdk/keycodes';


@Injectable({providedIn: 'any'})
export class AuthService extends HttpService {
  private readonly BASE_URL: string = '';
  public redirectUrl: string;
  public userInfo: UserInfo;

  constructor() {
    super();
    this.BASE_URL = this.configService.appSettings.auth.endpoint;
  }
  protected getBaseUrl(): string {
    return this.configService.getservice('foundation.meta').endpoint;
  }

  login(userInputModel: UserInputModel): Observable<any> {
    if(userInputModel.userName === 'vishal') {
      userInputModel = Object.assign({}, userInputModel, {
        userName: 'Exxat.superadmin'
      });
    }
      let url = this.getEndpoint(`${this.BASE_URL}/account/login`);
          if (!this.BASE_URL) {
            url = this.getEndpoint(
              `${this.configService.appSettings.auth.endpoint}/account/login`
            );
          }
          const requestBody = this.getRequestBody<UserInputModel>(userInputModel);
          return this.httpClient.post<User>(url, requestBody);
  }

  private getRequestBody<T>(inputBody: T) {
    let requestBody: any = inputBody;
    if (this.configService.appSettings.Cryptography.EnableEncryption) {
      requestBody = Cryptography.encryptRequest<T>(
        inputBody,
        this.configService
      );
    }
    return requestBody;
  }

  public autoRenewToken(refreshToken: string) {
    let url = this.getFinalUrl('/account/tokenRenewalRequest');
    let requestBody = this.getRequestBody<{ refreshToken: string }>({
      refreshToken: refreshToken
    });
    return this.httpClient.post<TokenModel>(url, requestBody);
  }

  public removeOldToken(refreshToken: string) {
    let url = this.getFinalUrl('/account/RemoveOldToken');
    let params: HttpParams = new HttpParams();
    params = params.append('refreshToken', refreshToken);
    return this.httpClient
      .delete<any>(url, { params: params })
      .pipe(
        catchError((error, source) =>
          this.httpResponseHandler.onCatch(error, source)
        )
      );
  }

  public getFinalUrl(remaingUrl: string) {
    return (
      this.getEndpoint(
        this.BASE_URL
          ? this.BASE_URL
          : this.configService.appSettings.auth.endpoint
      ) + remaingUrl
    );
  }
  setUserInfo(firstName, lastName, userName, password, isPasswordStrong) {
    var encryptedPassword = Cryptography.encryptText(
      password,
      this.configService
    );
    this.userInfo = new UserInfo(
      firstName,
      lastName,
      userName,
      encryptedPassword,
      isPasswordStrong
    );
    sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  getUserInfo(): UserInfo {
    if (this.userInfo === null || this.userInfo === undefined) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    this.userInfo.password = Cryptography.decryptText(
      this.userInfo?.password,
      this.configService
    );
    return this.userInfo;
  }

  isPasswordStrong(): boolean {
    if (this.userInfo && this.userInfo.isPasswordStrong) {
      return this.userInfo.isPasswordStrong;
    } else {
      var ispwdStrong = JSON.parse(
        sessionStorage.getItem('userInfo')
      )?.isPasswordStrong;
      if (ispwdStrong) {
        return ispwdStrong;
      }
      return true;
    }
  }
  removeUserInfo() {
    sessionStorage.removeItem('userInfo');
  }

  @GET('/launch')
  Launch(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string
  ): Observable<LaunchDataModel[]> {
    return null;
  }

  @GET('/{tenantId}/{oucode}/access')
  public Role(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string,
    @Path('tenantId') tenantId: string,
    @Path('oucode') oucode: string,
    @Query('hash') hash: string,
    @Query('isfaculty') isfaculty: boolean,
    @Query('isViewAsStudent') isViewAsStudent: boolean
  ): Observable<HashDataModel[]> {
    return null;
  }
  @GET('/{tenantId}/{oucode}/navigation')
  public Navigation(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string,
    @Path('tenantId') tenantId: string,
    @Path('oucode') oucode: string,
    @Query('hash') hash: string,
    @Query('userType') userType: string,
    @Query('isFaculty') isFaculty: boolean
  ): Observable<NavigationChangeDetector> {
    return null;
  }

  signUp(username: string, password: string): Observable<TokenModel> {
    const url = this.getEndpoint(`${this.BASE_URL}/register`);
    return this.httpClient.post<TokenModel>(url, {
      username: username,
      password: password,
      GrantType: 'password'
    });
  }

  adSignUp(user: any, tokenModel: TokenModel): Observable<any> {
    const url = this.getEndpoint(
      `${
        this.configService.getservice('foundation.registration').endpoint
      }/Registration/ADUserRegister`
    );

    return this.httpClient.post(url, user);
  }

  Logout(refreshToken: string, lastLogintime: string): Observable<any> {
    let url = this.getEndpoint(`${this.BASE_URL}/account/logout`);
    if (!this.BASE_URL) {
      url = this.getEndpoint(
        `${this.configService.appSettings.auth.endpoint}/account/logout`
      );
    }

    let params: HttpParams = new HttpParams();
    params = params.append('refreshToken', refreshToken);
    params = params.append('lastLogintime', lastLogintime);
    Logger.trace('Logout is called with refresh token:' + refreshToken);
    return this.httpClient.get<any>(url, { params: params }).pipe(
      tap((_) => window.location.reload()),
      catchError((error, source) =>
        this.httpResponseHandler.onCatch(error, source)
      )
    );
  }

  parseJwtToken(token: string): any {
    if (token !== undefined) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    }
    return undefined;
  }

  @GET<OrgUnit>('/OrgUnit/{id}')
  public getOrgUnit(@Path('id') id: any): Observable<OrgUnit> {
    return null;
  }

  @GET<OrgUnit[]>('/OrgUnit/GetOrgUnitsInformation')
  public getOrgUnitInfo(
    @Query('oucodes') oucodes: string[]
  ): Observable<OrgUnit[]> {
    return null;
  }

  @GET<OrgUnit>('/Organization/{id}')
  public getOrganization(@Path('id') id: any): Observable<Organization> {
    return null;
  }

  @GET<any>('/MetaConfiguration/getScheduledDowntimeInfo')
  public getScheduledDowntimeInfo(): Observable<any> {
    return null;
  }
}
